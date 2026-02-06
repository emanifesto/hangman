export const onRequestPost = async (context: any) => {
    const request = await context.request.json()
    console.log(request)
    console.log(context.params)
    console.log(context.data)
    console.log(context.env.ASSETS)
    console.log(request.full)
    console.log(request.decoded)
    return new Response('Success', {status: 200})
}