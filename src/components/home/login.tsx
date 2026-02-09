import {GoogleLogin, googleLogout} from "@react-oauth/google"
import type { MouseEventHandler } from "react"

export default function LoginButton( {...props}: {isLoggedIn: boolean, setLoggedIn: Function, gameData: Object} ){
    function handleSignOut(){
        props.setLoggedIn(false)
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
            {props.isLoggedIn ? 
                <LogoutButton handleSignOut={handleSignOut} /> :
                <GoogleLogin text={login_text} width={login_width} auto_select={true} onSuccess={(response) => {
                    props.setLoggedIn(true)
                    if (props.gameData){
                        handleCredentialResponse(response, props.gameData)
                    }else{
                        handleCredentialResponse(response)
                    }
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

async function handleCredentialResponse(response: any, gameData={}) {
    const url: string = "https://hangman-26m.pages.dev/"

    console.log(Boolean(gameData))
    let body: Object

    gameData ?
        body = {response: response, gameData: gameData} :
        body = {response: response}

    const serverLoginResponse: Response = await fetch(`${url}user-login`, {
        method: "POST",
        headers: {"content-type": 'application/json'},
        body: JSON.stringify(body)
    })
    
    console.log(serverLoginResponse.ok)
}