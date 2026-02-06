import {GoogleLogin, googleLogout} from "@react-oauth/google"
import type { MouseEventHandler } from "react"

export default function LoginButton( {isLoggedIn=false, setLoggedIn, design}: {isLoggedIn: boolean, setLoggedIn: Function, design: Object} ){
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

function decodeJWT(token: any) {

    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
        atob(base64)
        .split("")
        .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
    }

function handleCredentialResponse(response: any) {

    console.log("Encoded JWT ID token: " + response.credential);

    const responsePayload = decodeJWT(response.credential);

    console.log("Decoded JWT ID token fields:");
    console.log("  Full Name: " + responsePayload.name);
    console.log("  Given Name: " + responsePayload.given_name);
    console.log("  Family Name: " + responsePayload.family_name);
    console.log("  Unique ID: " + responsePayload.sub);
    console.log("  Profile image URL: " + responsePayload.picture);
    console.log("  Email: " + responsePayload.email);
}