import LoginButton from '../home/login.tsx'

export default function LoginBanner(){
    return(
        <div className="flex mt-1 px-4 py-2 items-center gap-2 bg-blue-600">
            <p className="">Login to compete in the Leaderboard!</p>
            <div className=""><LoginButton /></div>
        </div>
    )
}