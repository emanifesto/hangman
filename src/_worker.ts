import jwt from 'jsonwebtoken'
import jwtToPem from 'jwk-to-pem'
import * as BF from './utils/BackendFunctions.ts'

export default{
    async fetch(request: Request, env: any){
        const url = new URL(request.url)

        if (url.pathname.startsWith('/user-login')){
            const origin = request.headers.get('origin')
            const originIsInvalid = origin ? BF.testForInvalidOrigin(origin) : true
            if (originIsInvalid) {
                console.log(`Origin is invalid. Request came from ${origin}`)
                return new Response('Fail', {status: 400})
            }
        
            const body = await request.json()
            const googleResponse = body.response
        
            const clientId = env.GOOGLE_OAUTH_CLIENT_ID
            const googleClientId = googleResponse.clientId
            const googleClientIdIsInvalid = BF.testForInvalidClientId(clientId, googleClientId)
            if (googleClientIdIsInvalid){
                console.log(`Google Response Client ID is invalid. Response Client ID: ${googleClientId}`)
                return new Response('Fail', {status: 400})
            }
            
            const token = googleResponse.credential
            const googleJWTHeader = BF.decodeJWT(token, 0)
        
            const googleJWTAlg = googleJWTHeader.alg
            if (googleJWTAlg != "RS256"){
                console.log(`False algorithm. JWT from response signed with ${googleJWTAlg}`)
                return new Response("Fail", {status: 400})
            }
        
            let googleCertificates
            googleCertificates = await env.KV.get('google-certificates', 'json')
        
            if (!googleCertificates){
                const newGoogleCertificates: any = await BF.fetchGoogleCertificates()
                await env.KV.put('google-certificates', JSON.stringify(newGoogleCertificates.keys), {expiration: newGoogleCertificates.expiration / 1000})
                googleCertificates = newGoogleCertificates.keys
            }
        
            const googleJWTkid = googleJWTHeader.kid
            let certificate
            for (const cert of googleCertificates){
                if ((cert.kid == googleJWTkid) && (cert.alg == googleJWTAlg)){
                    certificate = cert
                    break
                }
            }
        
            if (!certificate){
                console.log(`Google Certificates do not contain public key with kid - ${googleJWTkid}`)
                return new Response('Fail', {status: 400})
            }

            const googlePublicKey = jwtToPem(certificate)
        
            let googleJWTPayload: any
            try {
                googleJWTPayload = jwt.verify(token, googlePublicKey, {
                    algorithms: [googleJWTAlg],
                    ignoreExpiration: false,
                    issuer: ["https://accounts.google.com", "accounts.google.com"],
                    audience: clientId,
                })
            } catch(e) {
                console.log(e)
                return new Response("Fail", {status: 400})
            }
        
            console.log(googleJWTPayload)
            if (!googleJWTPayload){
                console.log(`jsonwebtoken library could not verify token: ${token} against google public key: ${googlePublicKey}`)
                return new Response("Fail", {status: 400})
            }
        
            const {sub, email, name, picture} = googleJWTPayload
            const dateJoined = new Date(Date.now()).toLocaleString("en-US", {timeZone: "America/New_York"})
        
            let query
            if (body.gameData){
                const {loss, win, score, timePlayed, livesLeft, flawless} = body.gameData
                const lossUpdate = loss ? `dailyGamesLost = dailyGamesLost + 1, weeklyGamesLost = weeklyGamesLost + 1, allGamesLost = allGamesLost + 1` : ""
                const winUpdate = win ? `dailyGamesWon = dailyGamesWon + 1, weeklyGamesWon = weeklyGamesWon + 1, allGamesWon = allGamesWon + 1` : ""
                const flawlessUpdate = flawless ? `dailyFlawless = dailyFlawless + 1, weeklyFlawless = weeklyFlawless + 1, allFlawless = allFlawless + 1` : ""
                const timePlayedUpdate = `dailyTimePlayed = dailyTimePlayed + ${timePlayed}, weeklyTimePlayed = weeklyTimePlayed + ${timePlayed}, allTimePlayed = allTimePlayed + ${timePlayed}`
                const livesLeftUpdate = `dailyLivesLeft = dailyLivesLeft + ${livesLeft}, weeklyLivesLeft = weeklyLivesLeft + ${livesLeft}, allLivesLeft = allLivesLeft + ${livesLeft}`
                const scoreUpdate = `dailyScore = dailyScore + ${score}, weeklyScore = weeklyScore + ${score}, allScore = allScore + ${score}`
        
                query = env.DB.prepare(`INSERT INTO Users (userID, name, username, email, pictureURL, dateJoined, 
                    dailyGamesLost, dailyGamesWon, dailyScore, dailyTimePlayed, dailyLivesLeft, dailyFlawless, weeklyGamesLost, 
                    weeklyGamesWon, weeklyScore, weeklyTimePlayed, weeklyLivesLeft, weeklyFlawless, allGamesLost, allGamesWon, 
                    allScore, allTimePlayed, allLivesLeft, allFlawless) VALUES ("${sub}", "${name}", "${name}", "${email}", 
                    "${picture}", "${dateJoined}", ${loss}, ${win}, ${score}, ${timePlayed}, ${livesLeft}, ${flawless}, ${loss}, 
                    ${win}, ${score}, ${timePlayed}, ${livesLeft}, ${flawless}, ${loss}, ${win}, ${score}, ${timePlayed}, 
                    ${livesLeft}, ${flawless}) ON CONFLICT(userID) DO UPDATE Users SET (${lossUpdate}, ${winUpdate}, 
                    ${flawlessUpdate}, ${timePlayedUpdate}, ${livesLeftUpdate}, ${scoreUpdate}) WHERE userID = ${sub}`)    
            } else {
                query = env.DB.prepare(`INSERT INTO Users (userID, name, username, email, pictureURL, dateJoined)
                    VALUES ("${sub}", "${name}", "${name}", "${email}", "${picture}", "${dateJoined}")
                    ON CONFLICT(userID) DO NOTHING`)
            }
        
            const DBreturn = await query.run()
            console.log(DBreturn)
        
            return new Response('Success', {status: 200})
        }

        return env.ASSETS.fetch(request)
    },

    async scheduled(controller: any, env: any, ctx: any){
        switch (controller.cron){
            case "0 5 * * *":
                ctx.waitUntil(BF.clearDailyEntries(env))
                break
            case "0 5 0 0 MON":
                break
        }
    }
}