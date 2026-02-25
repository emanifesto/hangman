export function testForInvalidOrigin(origin: string): boolean{
    if ((origin === "https://hangman-26m.pages.dev") || origin === "https://hangman.damisaas.com"){
        return false
    }
    return true
}

export function testForInvalidClientId(clientId: string, testClientId: string): boolean{
    if (clientId === testClientId){
        return false
    }
    return true
}

export async function fetchGoogleCertificates(): Promise<Object> {
    const googleCertificate = await fetch('https://www.googleapis.com/oauth2/v3/certs')
    const expiration: number = Date.now() + (Number(googleCertificate.headers.get('Cache-Control')?.split(',')[1].slice(9)) * 1000)
    const keys: Object = await googleCertificate.json().then(res => res.keys)

    return {
        'expiration': expiration,
        'keys': keys,
    }
}

export function decodeJWT(token: any, position: number) {

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