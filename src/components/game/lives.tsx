import { type JSX } from 'react'

export default function Lives(){

    return(
        <div className='bg-[#cad9fa] p-4 basis-1/2 place-items-center rounded-xl col-span-3 row-span-6'>
            <BodyPartBox 
                bodyPart={
                    <div className='w-4 h-4 bg-red-400 rounded-[50%]'></div>
                }
                status="alive"/>
            <div className='flex'>
                <BodyPartBox 
                    bodyPart={
                        <div className='w-2 h-6 bg-red-400'></div>
                    }
                    status="alive"/>
                <BodyPartBox 
                    bodyPart={
                        <div className='w-4 h-6 bg-red-400'></div>
                    }
                    status="alive"/>
                <BodyPartBox 
                    bodyPart={
                        <div className='w-2 h-6 bg-red-400'></div>
                    }
                    status="alive"/>
            </div>
            
            <BodyPartBox 
                bodyPart={
                    <div className='w-4 h-2 bg-red-400'></div>
                }
                status="alive"/>
            <div className='flex'>
                <BodyPartBox 
                    bodyPart={
                        <div className='w-2 h-6 bg-red-400'></div>
                    }
                    status="alive"/>
                <BodyPartBox 
                    bodyPart={
                        <div className='w-2 h-6 bg-red-400'></div>
                    }
                    status="alive"/>
            </div>
            
        </div>
    )
}

function BodyPartBox({ bodyPart, status }: {bodyPart: JSX.Element, status: string}){
    const bgcolor = {
        alive: " bg-green-500 ",
        dead: " bg-red-500 "
    }[status]

    return( 
        <div className="p-1.5 bg-black w-min">
            <div className={`${bgcolor} p-4 w-min rounded-xl`}>
                {bodyPart}
            </div>
        </div>
    )
}