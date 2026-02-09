import LoginButton from '../home/login.tsx'

export default function LoginBanner({isLoggedIn, setLoggedIn}: {isLoggedIn: boolean, setLoggedIn: Function}){
    return(
        <div className="flex px-4 py-2 text-sm sm:text-xl items-center justify-center gap-4 bg-black/50">
            <p className="">Login to compete in the Leaderboard!</p>
            <div className=""><LoginButton gameData="" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /></div>
        </div>
    )
}