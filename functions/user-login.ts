export const onRequestPost = async (context: any) => {

    const body = await context.request.json()
    const authResponse = body.response

    const authPayload = decodeJWTPayload(authResponse.credential)
    const authClientId = authResponse.clientId


    console.log(context)
    console.log(body)
    console.log(authResponse)
    console.log(authPayload)
    console.log(authClientId)
    const cookie = context.request.headers.get('cookie')
    console.log(cookie)

    const origin = context.request.headers.get('origin')
    const originIsInvalid = testForInvalidOrigin(origin)
    if (originIsInvalid) {
        console.log(`Origin is invalid. Request came from ${origin}`)
        return new Response('Fail', {status: 400})
    }

    return new Response('Success', {status: 200})
}


function testForInvalidOrigin(origin: string): boolean{
    if ((origin === "https://hangman-26m.pages.dev") || origin === "https://hangman.damisaas.com"){
        return false
    }
    return true
}


function decodeJWTPayload(token: any) {

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