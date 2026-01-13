export default function NavigationMenu( {menuSelection, children}: {menuSelection: string, children: any}){

    return (
        <>
            <div className="flex bg-blue-600 px-10 mb-10 justify-items-start items-center border">
                <HomeButton item={menuSelection}/>
                <LeaderboardButton item={menuSelection} />
            </div>
            {children}
        </>
    )
}

function HomeButton ( {item}: {item: string} ){
    const design = item === "home" ? selected : unselected
    return(
        <p className={design}>Home</p>
    )
}

function LeaderboardButton ( {item}: {item: string} ){
    const design:string = item === "leaderboard" ? selected : unselected
    return (
        <p className={design}>Leaderboard</p>
    )
}

const selected: string = "text-2xl p-3 rounded-2xl bg-blue-500"
const unselected: string = "text-2xl p-3"