export const onRequestPost = async (context: any) => {
    const request = await context.request.json()
    console.log(request)
    console.log(await context.params)
    console.log(await context.data)
    console.log(await context.env.ASSETS)
    console.log(JSON.stringify(request.full))
    console.log(JSON.stringify(request.decoded))
    return new Response('Success', {status: 200})
}