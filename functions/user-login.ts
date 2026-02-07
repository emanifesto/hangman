export const onRequestPost = async (context: any) => {

    const headers = new Headers(context.request.headers)
    const body = await context.request.json()
    const authResponse = body.response

    const authPayload = decodeJWTPayload(authResponse.credential)
    const authClientId = authResponse.clientId


    console.log(context.request)
    console.log(body)
    console.log(authResponse)
    console.log(authPayload)
    console.log(authClientId)

    return new Response('Success', {status: 200})
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