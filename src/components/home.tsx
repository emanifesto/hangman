import Profile from './home/profile.tsx'
import PlayButton from './home/play.tsx'
import LoginButton from './home/login.tsx'

export default function Home(){
    return(
        <div className="flex gap-y-5 gap-x-[100%] flex-wrap justify-center">
            <Profile />
            <PlayButton />
            <LoginButton />
        </div>
    )
}