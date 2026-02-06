export const onRequestPost = async (context: any) => {
    console.log(context)
    return new Response('Success', {status: 200})
}