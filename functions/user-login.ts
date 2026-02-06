export const onRequestPost = async (context: any) => {
    const body = await context.request.json()
    console.log(body)
    return new Response('Success', {status: 200})
}