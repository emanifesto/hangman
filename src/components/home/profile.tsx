import UserProfile, {type Profile} from "../../utils/UserProfile";

const user: Profile = new UserProfile('Emmanuel', new Date('Wed Jan 14 2026')
, 10, 1, 5, 500, 100, 20, 2, 50, 10, 12, 4000, 400, 100, 18, 400, 49, 100, 10000, 1000, 2000, 200)

export default function Profile(){

    return(
        <div className="border-3 min-h-50 ">
            <User />
            <div className="border w-[95%] mx-auto"></div>
            <Info />
        </div>
    )
}

function User(){
    return(
        <div className="flex text-xs gap-4 justify-center place-items-center my-3">
            <div className="flex gap-2 items-center">
                <p className="font-bold">Username:</p>
                <input placeholder="enter name..." className="bg-black text-white rounded-xl py-1 text-center" />
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
        <div className="text-xs">
            <h1 className="text-2xl w-min ml-4">Stats</h1>
            <table className="mx-auto border-spacing-x-7.5 border-spacing-y-2 border-separate">
                <thead>
                    <th></th>
                    <th><p>Daily</p></th>
                    <th><p>Weekly</p></th>
                    <th><p>All-Time</p></th>
                </thead>
                <tr>
                    <th><p>Games(W/L/Total)</p></th>
                    <td><p>{user.daily.games_won + ' / ' + user.daily.games_lost + ' / ' + user.daily.games_total}</p></td>
                    <td><p>{user.weekly.games_won + ' / ' + user.weekly.games_lost + ' / ' + user.weekly.games_total}</p></td>
                    <td><p>{user.all_time.games_won + ' / ' + user.all_time.games_lost + ' / ' + user.all_time.games_total}</p></td>
                </tr>
                <tr>
                    <th><p>Score</p></th>
                     <td><p>{user.daily.score}</p></td>
                    <td><p>{user.weekly.score}</p></td>
                    <td><p>{user.all_time.score}</p></td>
                </tr>
                <tr>
                    <th><p>Speed</p></th>
                     <td><p>{user.daily.speed}</p></td>
                    <td><p>{user.weekly.speed}</p></td>
                    <td><p>{user.all_time.speed}</p></td>
                </tr>
                <tr>
                    <th><p>Accuracy</p></th>
                     <td><p>{user.daily.accuracy}</p></td>
                    <td><p>{user.weekly.accuracy}</p></td>
                    <td><p>{user.all_time.accuracy}</p></td>
                </tr>
                <tr>
                    <th><p>Predictions</p></th>
                     <td><p>{user.daily.predictions}</p></td>
                    <td><p>{user.weekly.predictions}</p></td>
                    <td><p>{user.all_time.predictions}</p></td>
                </tr>
                <tr>
                    <th><p>Flawless Games</p></th>
                     <td><p>{user.daily.flawless_games}</p></td>
                    <td><p>{user.weekly.flawless_games}</p></td>
                    <td><p>{user.all_time.flawless_games}</p></td>
                </tr>
            </table>
        </div>
    )

}