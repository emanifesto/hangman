import {GoogleLogin, googleLogout} from "@react-oauth/google"
import type { MouseEventHandler } from "react"

export default function LoginButton( {isLoggedIn=false, setLoggedIn}: {isLoggedIn: boolean, setLoggedIn: Function} ){
    function handleSignOut(){
        setLoggedIn(false)
        googleLogout()
    }
    const small_screen: boolean = window.innerWidth < 700
    let login_text: "signin" | undefined
    let login_width: number | string
    switch(small_screen){
        case true:
            login_text = "signin"
            login_width = 150
            break
        default: 
            login_text = undefined
            login_width = ''
    }

    return(
        <button className="rounded-md overflow-hidden">
            {isLoggedIn ? 
                <LogoutButton handleSignOut={handleSignOut} /> :
                <GoogleLogin text={login_text} width={login_width} auto_select={true} onSuccess={(response) => {
                    setLoggedIn(true)
                    handleCredentialResponse(response)
                }}/>
            }
        </button>
    )
}

function LogoutButton( {handleSignOut}: {handleSignOut: MouseEventHandler}){
    return(
        <div onClick={handleSignOut} className="bg-white w-50 pt-1 pb-1.5 rounded-sm hover:text-red-500 hover:cursor-pointer hover:bg-gray-50">
            <p>Sign out</p>
        </div>
    )
}

async function handleCredentialResponse(response: any) {
    const url: string = "https://hangman-26m.pages.dev/"

    const serverLoginResponse: Response = await fetch(`${url}user-login`, {
        method: "POST",
        headers: {"content-type": 'application/json'},
        body: JSON.stringify({
            response: response,
        })
    })
    
    console.log(serverLoginResponse.ok)
}