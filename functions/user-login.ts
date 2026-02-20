// import jwt from 'jsonwebtoken'
// const jwt = require('jsonwebtoken')

export const onRequestPost = async (context: any) => {

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
    
    const token = googleResponse.credential
    const googleJWTHeader = decodeJWT(token, 0)

    const googleJWTAlg = googleJWTHeader.alg
    if (googleJWTAlg != "RS256"){
        console.log(`False algorithm. JWT from response signed with ${googleJWTAlg}`)
        return new Response("Fail", {status: 400})
    }

    let googleCertificates
    googleCertificates = await context.env.KV.get('google-certificates', 'json')

    if (!googleCertificates){
        const newGoogleCertificates: any = await fetchGoogleCertificates()
        const KVUpdate = await context.env.KV.put('google-certificates', JSON.stringify(newGoogleCertificates.keys), {expiration: newGoogleCertificates.expiration / 1000})
        googleCertificates = newGoogleCertificates.keys
    }

    const googleJWTkid = googleJWTHeader.kid
    let googlePublicKey
    for (const certificate of googleCertificates){
        if ((certificate.kid == googleJWTkid) && (certificate.alg == googleJWTAlg)){
            googlePublicKey = certificate.n
            break
        }
    }

    if (!googlePublicKey){
        console.log(`Google Certificates do not contain public key with kid - ${googleJWTkid}`)
        return new Response('Fail', {status: 400})
    }

    console.log(googleCertificates)
    console.log(googlePublicKey)




    const googleJWTPayload = decodeJWT(token, 1)

    let exp = googleJWTPayload.exp
    let now: Date | number = Date.now()

    const trailingZeros = now.toString().length - String(exp).length
    exp = new Date(exp * Math.pow(10, trailingZeros))
    now = new Date(now)

    const expIsInvalid = testForInvalidExpiration(exp, now)
    if (expIsInvalid){
        console.log(`Token expiration is invalid. It expired ${exp.toLocaleString("en-US", {timeZone: "America/New_York"})}. Request was made ${now.toLocaleString("en-US", {timeZone: "America/New_York"})}`)
        return new Response('Fail', {status: 400})
    }

    const iss = googleJWTPayload.iss
    const issIsInvalid = testForInvalidIssuer(iss)
    if (issIsInvalid){
        console.log(`Invalid issuer. Token issued by ${iss}`)
        return new Response('Fail', {status: 400})
    }

    const aud = googleJWTPayload.aud
    const audIsInvalid = testForInvalidClientId(clientId, aud)
    if (audIsInvalid){
        console.log(`Invalid audience. Audience Client ID is ${aud}`)
        return new Response('Fail', {status: 400})
    }

    const {sub, email, name, picture} = googleJWTPayload
    const dateJoined = now.toLocaleString("en-US", {timeZone: "America/New_York"})
    let query

    if (body.gameData){
        const {loss, win, score, timePlayed, livesLeft, flawless} = body.gameData
        const lossUpdate = loss ? `dailyGamesLost = dailyGamesLost + 1, weeklyGamesLost = weeklyGamesLost + 1, allGamesLost = allGamesLost + 1` : ""
        const winUpdate = win ? `dailyGamesWon = dailyGamesWon + 1, weeklyGamesWon = weeklyGamesWon + 1, allGamesWon = allGamesWon + 1` : ""
        const flawlessUpdate = flawless ? `dailyFlawless = dailyFlawless + 1, weeklyFlawless = weeklyFlawless + 1, allFlawless = allFlawless + 1` : ""
        const timePlayedUpdate = `dailyTimePlayed = dailyTimePlayed + ${timePlayed}, weeklyTimePlayed = weeklyTimePlayed + ${timePlayed}, allTimePlayed = allTimePlayed + ${timePlayed}`
        const livesLeftUpdate = `dailyLivesLeft = dailyLivesLeft + ${livesLeft}, weeklyLivesLeft = weeklyLivesLeft + ${livesLeft}, allLivesLeft = allLivesLeft + ${livesLeft}`
        const scoreUpdate = `dailyScore = dailyScore + ${score}, weeklyScore = weeklyScore + ${score}, allScore = allScore + ${score}`

        query = context.env.DB.prepare(`INSERT INTO Users (userID, name, username, email, pictureURL, dateJoined, 
            dailyGamesLost, dailyGamesWon, dailyScore, dailyTimePlayed, dailyLivesLeft, dailyFlawless, weeklyGamesLost, 
            weeklyGamesWon, weeklyScore, weeklyTimePlayed, weeklyLivesLeft, weeklyFlawless, allGamesLost, allGamesWon, 
            allScore, allTimePlayed, allLivesLeft, allFlawless) VALUES ("${sub}", "${name}", "${name}", "${email}", 
            "${picture}", "${dateJoined}", ${loss}, ${win}, ${score}, ${timePlayed}, ${livesLeft}, ${flawless}, ${loss}, 
            ${win}, ${score}, ${timePlayed}, ${livesLeft}, ${flawless}, ${loss}, ${win}, ${score}, ${timePlayed}, 
            ${livesLeft}, ${flawless}) ON CONFLICT(userID) DO UPDATE Users SET (${lossUpdate}, ${winUpdate}, 
            ${flawlessUpdate}, ${timePlayedUpdate}, ${livesLeftUpdate}, ${scoreUpdate}) WHERE userID = ${sub}`)    
    } else {
        query = context.env.DB.prepare(`INSERT INTO Users (userID, name, username, email, pictureURL, dateJoined)
            VALUES ("${sub}", "${name}", "${name}", "${email}", "${picture}", "${dateJoined}")
            ON CONFLICT(userID) DO NOTHING`)
    }

    const returnVal = await query.run()
    console.log(returnVal)

    return new Response('Success', {status: 200})
}


function testForInvalidOrigin(origin: string): boolean{
    if ((origin === "https://hangman-26m.pages.dev") || origin === "https://hangman.damisaas.com"){
        return false
    }
    return true
}

function testForInvalidClientId(clientId: string, testClientId: string): boolean{
    if (clientId === testClientId){
        return false
    }
    return true
}

async function fetchGoogleCertificates(): Promise<Object> {
    const googleCertificate = await fetch('https://www.googleapis.com/oauth2/v3/certs')
    const expiration: number = Date.now() + (Number(googleCertificate.headers.get('Cache-Control')?.split(',')[1].slice(9)) * 1000)
    const keys: Object = await googleCertificate.json().then(res => res.keys)

    return {
        'expiration': expiration,
        'keys': keys,
    }
}

function testForInvalidExpiration(exp: Date, now: Date): boolean{
    if (now < exp){
        return false
    }
    return true
}

function testForInvalidIssuer(iss: string): boolean{
    if (iss === "https://accounts.google.com" || iss === "accounts.google.com"){
        return false
    }
    return true
}

function decodeJWT(token: any, position: number) {

    let base64Url = token.split(".")[position];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonObject = decodeURIComponent(
        atob(base64)
        .split("")
        .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonObject);
}