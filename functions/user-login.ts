export const onRequestPost = async (context: any) => {

    const headers = new Headers(context.request.headers)
    const body = await context.request.json()
    const authResponse = body.response

    const authPayload = decodeJWTPayload(authResponse.credential)
    const authClientId = authResponse.clientId

    const {OAuth2Client} = require('google-auth-library')
    const client = new OAuth2Client
    const ticket = await client.verifyIdToken({
        idToken: authResponse,
        audience: context.env.GOOGLE_OAUTH_CLIENT_ID
    })
    const payload = ticket.getPayload()
    const userid = payload['sub']

    console.log(`Body: ${body}`)
    console.log(`AuthResponse: ${authResponse}`)
    console.log(`Ticket: ${ticket}`)
    console.log(`AuthPayload: ${authPayload}`)
    console.log(`Payload: ${payload}`)
    console.log(`AuthClientId: ${authClientId}`)
    console.log(`UserId: ${userid}`)
    
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