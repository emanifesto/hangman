export default function NavigationMenu( {menuSelection, setMenuSelection, children}: {menuSelection: string, setMenuSelection: Function, children: any}){
    const menuClickHandler: Function = (value: string) => {setMenuSelection(value)}
    
    return (
        <>
            <div className="py-1  bg-blue-300 place-items-center border-b-6 rounded-xl border-black/40">
                <div className="flex">
                    <HomeButton item={menuSelection} menuClick={menuClickHandler}/>
                    <LeaderboardButton item={menuSelection} menuClick={menuClickHandler}/>
                </div>
            </div>
            {children}
        </>
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

const selected: string = "text-2xl p-3 rounded-2xl bg-blue-400/70"
const unselected: string = "text-2xl p-3"