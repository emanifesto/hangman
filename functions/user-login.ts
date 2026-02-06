export const onRequestPost = async (context: any) => {
    const body = await context.request.json()
    console.log(body)
    const googleResponse: Response = body['full']
    console.log(await googleResponse.json())
    console.log(body['decoded'])
    return new Response('Success', {status: 200})
}