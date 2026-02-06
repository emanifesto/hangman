export const onRequestPost = async (context: any) => {
    console.log(context)
    console.log(await context.request.json())
    return new Response('Success', {status: 200})
}