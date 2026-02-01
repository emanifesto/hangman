import UserProfile, {type Profile} from "../../utils/UserProfile";

const user: Profile = new UserProfile('Emmanuel', new Date('Wed Jan 14 2026')
, 10, 1, 5, 500, 100, 20, 2, 50, 10, 12, 4000, 400, 100, 18, 400, 49, 100, 10000, 1000, 2000, 200)

export default function Profile(){

    return(
        <div className="border-3 w-[95%]">
            <User />
            <div className="border w-[95%] mx-auto"></div>
            <Info />
        </div>
    )
}

function User(){
    return(
        <div className="flex flex-wrap gap-y-2 mx-auto w-min my-3">
            <div className="flex gap-2 items-center">
                <p className="font-bold">Username:</p>
                <input placeholder="enter your name" className="bg-black text-white w-[20ch] rounded-xl py-1 text-center" />
            </div>
            <div className="flex gap-2">
                <p className="font-bold">Date Joined:</p>
                <p>{user.date_joined.toDateString()}</p>
            </div>
        </div>
    )
}

function Info(){
    return (
        <div className="flex justify-evenly py-2">
            <div className="font-extrabold mt-6 text-left">
                <p>Games (W/L/Total)</p>
                <p>Score</p>
                <p>Speed</p>
                <p>Accuracy</p>
                {/* <p>Predictions</p> */}
                <p>Flawless Games</p>
            </div>
            <div className="flex w-[35%] overflow-x-auto snap-x snap-mandatory">
                <div className="shrink-0 basis-1/1 snap-center">
                    <p className="font-extrabold">Daily</p>
                    <p>{user.daily.games_won + ' / ' + user.daily.games_lost + ' / ' + user.daily.games_total}</p>
                    <p>{user.daily.score}</p>
                    <p>{user.daily.speed}</p>
                    <p>{user.daily.accuracy}</p>
                    {/* <p>{user.daily.predictions}</p> */}
                    <p>{user.daily.flawless_games}</p>
                </div>
                <div className="shrink-0 basis-1/1 snap-center">
                    <p className="font-extrabold">Weekly</p>
                    <p>{user.weekly.games_won + ' / ' + user.weekly.games_lost + ' / ' + user.weekly.games_total}</p>
                    <p>{user.weekly.score}</p>
                    <p>{user.weekly.speed}</p>
                    <p>{user.weekly.accuracy}</p>
                    {/* <p>{user.weekly.predictions}</p> */}
                    <p>{user.weekly.flawless_games}</p>
                </div>
                <div className="shrink-0 basis-1/1 snap-center">
                    <p className="font-extrabold">All-Time</p>
                    <p>{user.all_time.games_won + ' / ' + user.all_time.games_lost + ' / ' + user.all_time.games_total}</p>
                    <p>{user.all_time.score}</p>
                    <p>{user.all_time.speed}</p>
                    <p>{user.all_time.accuracy}</p>
                    {/* <p>{user.all_time.predictions}</p> */}
                    <p>{user.all_time.flawless_games}</p>
                </div>
            </div>
        </div>
    )

}