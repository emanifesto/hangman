import Leaderboard from '../components/leaderboard/leaderboard.tsx'

export default function LeaderboardPage({ isLoggedIn, setLoggedIn }: { isLoggedIn: boolean, setLoggedIn: Function}){
    return(
        <div>
            <Leaderboard isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        </div>
    )
}