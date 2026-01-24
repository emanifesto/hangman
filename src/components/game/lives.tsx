import { type JSX } from 'react'

export default function Lives(){
    const alive: string = " bg-green-500 "
    const dead: string = " bg-red-500 "

    return(
        <BodyPartBox 
            bodyPart={
                <svg viewBox="0 0 20 20" className="size-5 fill-black">
                    <circle radius="10" cx="10" cy="10" fill="black"/>
                </svg>
            }
            status={alive}/>
    )
}

function BodyPartBox({ bodyPart, status }: {bodyPart: JSX.Element, status: string}){
    return(
        <div className="p-2.5 bg-black w-min">
            <div className={status + "p-5 w-min rounded-lg"}>
                {bodyPart}
            </div>
        </div>
    )
}