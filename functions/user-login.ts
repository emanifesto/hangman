export const onRequestPost = async (context: any) => {
    const headers = context.request.headers
    const method = context.request.method
    const body = await context.request.json()
    const authBody = body.response

    const authHeader = decodeJWTHeader(authBody.credential)
    const authPayload = decodeJWTPayload(authBody.credential)
    const authSignature = decodeJWTSignature(authBody.credential)

    console.log(headers)
    console.log(method)
    console.log(body)
    console.log(authHeader)
    console.log(authPayload)
    console.log(authSignature)
    return new Response('Success', {status: 200})
}

function decodeJWTHeader(token: any) {

    let base64Url = token.split(".")[0];
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

function decodeJWTSignature(token: any) {

    let base64Url = token.split(".")[2];
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