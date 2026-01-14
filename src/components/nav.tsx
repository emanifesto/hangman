export default function NavigationMenu( {menuSelection, children}: {menuSelection: string, children: any}){

    return (
        <>
            <div className="m-auto w-4/5 bg-blue-400/50 place-items-center mb-10 border-b-6 rounded-xl border-black/40">
                <div className="flex">
                    <HomeButton item={menuSelection}/>
                    <LeaderboardButton item={menuSelection} />
                </div>
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

const selected: string = "text-2xl p-3 rounded-2xl bg-blue-400"
const unselected: string = "text-2xl p-3"