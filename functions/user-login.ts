export const onRequestPost = async (context: any) => {
    //code to validate jwt signature and retrieve public keys is needed

    const origin = context.request.headers.get('origin')
    const originIsInvalid = testForInvalidOrigin(origin)
    if (originIsInvalid) {
        console.log(`Origin is invalid. Request came from ${origin}`)
        return new Response('Fail', {status: 400})
    }

    const body = await context.request.json()
    const googleResponse = body.response

    const clientId = context.env.GOOGLE_OAUTH_CLIENT_ID
    const googleClientId = googleResponse.clientId
    const googleClientIdIsInvalid = testForInvalidClientId(clientId, googleClientId)
    if (googleClientIdIsInvalid){
        console.log(`Google Response Client ID is invalid. Response Client ID: ${googleClientId}`)
        return new Response('Fail', {status: 400})
    }

    const googlePayload = decodeJWTPayload(googleResponse.credential)

    const exp = googlePayload.exp
    const now = Date.now()
    const expIsInvalid = testForInvalidExpiration(exp, now)
    if (expIsInvalid){
        console.log(`Token expiration is invalid. It expired ${new Date(exp).toDateString()}. Request was made ${new Date(now).toDateString()}`)
        return new Response('Fail', {status: 400})
    }

    const iss = googlePayload.iss
    const issIsInvalid = testForInvalidIssuer(iss)
    if (issIsInvalid){
        console.log(`Invalid issuer. Token issued by ${iss}`)
        return new Response('Fail', {status: 400})
    }

    const aud = googlePayload.aud
    const audIsInvalid = testForInvalidClientId(clientId, aud)
    if (audIsInvalid){
        console.log(`Invalid audience. Audience Client ID is ${aud}`)
        return new Response('Fail', {status: 400})
    }


    console.log(context)
    console.log(googleResponse)
    console.log(googlePayload)
    console.log(googleClientId)
    const cookie = context.request.headers.get('cookie')
    console.log(cookie)

    return new Response('Success', {status: 200})
}


function testForInvalidOrigin(origin: string): boolean{
    console.log(origin)
    if ((origin === "https://hangman-26m.pages.dev") || origin === "https://hangman.damisaas.com"){
        return false
    }
    return true
}

function testForInvalidClientId(clientId: string, testClientId: string): boolean{
    console.log(clientId, testClientId)
    if (clientId === testClientId){
        return false
    }
    return true
}

function testForInvalidExpiration(exp: string, now: number): boolean{
    console.log(exp)
    console.log(now)
    console.log(new Date(exp).toDateString())
    console.log(new Date(now).toDateString())

    if (Number(exp) < now){
        return false
    }
    return true
}

function testForInvalidIssuer(iss: string): boolean{
    console.log(iss)
    if (iss === "https://accounts.google.com" || iss === "accounts.google.com"){
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