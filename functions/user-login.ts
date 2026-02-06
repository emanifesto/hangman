export const onRequestPost = async (context: any) => {
    console.log(context)
    console.log(context.request)
    return new Response('Success', {status: 200})
}