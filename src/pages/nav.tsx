import { type JSX } from 'react'

export default function NavigationMenu( {menuSelection, setMenuSelection, children}: {menuSelection: string, setMenuSelection: Function, children: JSX.Element}){
    const menuClickHandler: Function = (value: string) => {setMenuSelection(value)}
    
    return (
        <div className='w-[95%] h-[90vh] mx-auto pt-[5vh]'>
            <div className='pt-4 mx-auto max-w-300 bg-white/15 backdrop-blur-xs border border-white rounded-2xl'>
                <div className="p-2 w-fit justify-self-center bg-blue-300 place-items-center border-b-6 rounded-xl border-black/40">
                        <HomeButton item={menuSelection} menuClick={menuClickHandler}/>
                        <LeaderboardButton item={menuSelection} menuClick={menuClickHandler}/>
                </div>
                {children}
            </div>
        </div>
    )
}

function HomeButton ( {item, menuClick}: {item: string, menuClick: Function} ){
    const text: string = 'Home'
    const design: string = item === text ? selected : unselected
    return(
        <button className={design} onClick={() => {menuClick(text)}}>{text}</button>
    )
}

function LeaderboardButton ( {item, menuClick}: {item: string, menuClick: Function} ){
    const text: string = "Leaderboard"
    const design:string = item === text ? selected : unselected

    return (
        <button className={design} onClick={() => {menuClick(text)}}>{text}</button>
    )
}

const selected: string = "text-2xl p-3 rounded-2xl bg-blue-400"
const unselected: string = "text-2xl p-3"