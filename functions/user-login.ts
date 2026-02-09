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

    let exp = googlePayload.exp
    let now: Date | number = Date.now()

    const trailingZeros = now.toString().length - String(exp).length
    exp = new Date(exp * Math.pow(10, trailingZeros))
    now = new Date(now)

    const expIsInvalid = testForInvalidExpiration(exp, now)
    if (expIsInvalid){
        console.log(`Token expiration is invalid. It expired ${exp.toLocaleString("en-US", {timeZone: "America/New_York"})}. Request was made ${now.toLocaleString("en-US", {timeZone: "America/New_York"})}`)
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

    const {sub, email, name, picture} = googlePayload
    const dateJoined = now.toLocaleString("en-US", {timeZone: "America/New_York"})
    let query

    console.log(context)
    console.log(googleResponse)
    console.log(googlePayload)
    console.log(Boolean(body.gameData))
    if (body.gameData){
        const {loss, win, score, timePlayed, livesLeft, flawless} = body.gameData
        const lossUpdate = loss ? `dailyGamesLost = dailyGamesLost + 1, weeklyGamesLost = weeklyGamesLost + 1, allGamesLost = allGamesLost + 1` : ""
        const winUpdate = win ? `dailyGamesWon = dailyGamesWon + 1, weeklyGamesWon = weeklyGamesWon + 1, allGamesWon = allGamesWon + 1` : ""
        const flawlessUpdate = flawless ? `dailyFlawless = dailyFlawless + 1, weeklyFlawless = weeklyFlawless + 1, allFlawless = allFlawless + 1` : ""
        const timePlayedUpdate = `dailyTimePlayed = dailyTimePlayed + ${timePlayed}, weeklyTimePlayed = weeklyTimePlayed + ${timePlayed}, allTimePlayed = allTimePlayed + ${timePlayed}`
        const livesLeftUpdate = `dailyLivesLeft = dailyLivesLeft + ${livesLeft}, weeklyLivesLeft = weeklyLivesLeft + ${livesLeft}, allLivesLeft = allLivesLeft + ${livesLeft}`
        const scoreUpdate = `dailyScore = dailyScore + ${score}, weeklyScore = weeklyScore + ${score}, allScore = allScore + ${score}`

        query = context.env.DB.prepare(`IF NOT EXISTS (SELECT userID FROM Users WHERE userID = ${sub})
            BEGIN INSERT INTO Users (userID, name, username, email, pictureURL, dateJoined, dailyGamesLost, dailyGamesWon, 
            dailyScore, dailyTimePlayed, dailyLivesLeft, dailyFlawless, weeklyGamesLost, weeklyGamesWon, weeklyScore,
            weeklyTimePlayed, weeklyLivesLeft, weeklyFlawless, allGamesLost, allGamesWon, allScore, allTimePlayed,
            allLivesLeft, allFlawless) VALUES (${sub}, ${name}, ${name}, ${email}, ${picture}, ${dateJoined}, ${loss}, ${win},
            ${score}, ${timePlayed}, ${livesLeft}, ${flawless}, ${loss}, ${win}, ${score}, ${timePlayed}, ${livesLeft}, 
            ${flawless}, ${loss}, ${win}, ${score}, ${timePlayed}, ${livesLeft}, ${flawless}); END
            ELSE BEGIN UPDATE Users SET (${lossUpdate}, ${winUpdate}, ${flawlessUpdate}, ${timePlayedUpdate}, ${livesLeftUpdate}, ${scoreUpdate}) 
            WHERE userID = ${sub}; END`)
    }else{
        const theQuery = `INSERT INTO Users (userID, name, username, email, pictureURL, dateJoined) VALUES ("${sub}", "${name}", "${name}", "${email}", "${picture}", "${dateJoined}") ON CONFLICT(userID) DO NOTHING`
        console.log(theQuery)
        query = context.env.DB.prepare(theQuery)
    }

    const returnVal = await query.run()
    console.log(returnVal)
    console.log(context)
    console.log(googleResponse)
    console.log(googlePayload)

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