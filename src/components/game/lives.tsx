import { type JSX } from 'react'
import Head from '../../assets/Head.svg'
import Torso from '../../assets/Torso.svg'
import LeftArm from '../../assets/Left Arm.svg'
import RightArm from '../../assets/Right Arm.svg'
import Waist from '../../assets/Waist.svg'
import LeftLeg from '../../assets/Left Leg.svg'
import RightLeg from '../../assets/Right Leg.svg'

export default function Lives(){

    return(
        <div className='bg-[#cad9fa] inset-shadow-sm inset-shadow-[#5078b4] p-4 basis-1/2 content-center place-items-center rounded-xl col-span-3 row-span-5 col-start-1 overflow-y-hidden'>
            <BodyPartBox status="alive">
                <img src={Head} alt='a svg of a head' className='w-6 h-auto animate-pulse'/>
            </BodyPartBox>
            <div className='flex'>
                <BodyPartBox status="alive">
                    <img src={LeftArm} alt='a svg of an left arm' className='w-4.5 h-auto animate-pulse'/>
                </BodyPartBox>
                <BodyPartBox status="alive">
                    <img src={Torso} alt='a svg of a torso' className='w-10 h-auto animate-pulse'/>
                </BodyPartBox>
                <BodyPartBox status="alive">
                    <img src={RightArm} alt='a svg of an right arm' className='w-4.5 h-auto animate-pulse'/>
                </BodyPartBox>
            </div>
            <BodyPartBox status="alive">
                <img src={Waist} alt='a svg of a waist' className='w-10 h-auto animate-pulse'/>
            </BodyPartBox>
            <div className='flex'>
                <BodyPartBox status="alive">
                    <img src={LeftLeg} alt='a svg of a left leg' className='w-4 h-auto animate-pulse'/>
                </BodyPartBox>
                <BodyPartBox status="alive">
                    <img src={RightLeg} alt='a svg of a right leg' className='w-4 h-auto animate-pulse'/>
                </BodyPartBox>
            </div>
            
        </div>
    )
}

function BodyPartBox({ children, status }: {children: JSX.Element, status: string}){
    const filter = {
        alive: "after:bg-green-400/40",
        dead: "after:bg-red-500/40"
    }[status]

    return( 
        <div className={`after:absolute ${filter} after:top-0 after:left-0 after:rounded-xl after:size-full p-3 inset-ring-2 content-center bg-white rounded-xl relative inset-shadow-sm`}>
            {children}
        </div>
    )
}