export const onRequestPost = async (context: any) => {
    console.log(context)
    console.log(await context.request.json())
    console.log(await context.request.json().full.json())
    console.log(await context.request.json().decoded.json())
    console.log(await context.params.json())
    console.log(await context.data.json())
    console.log(await context.env.ASSETS.json())
    return new Response('Success', {status: 200})
}