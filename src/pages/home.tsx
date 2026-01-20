import Profile from '../components/home/profile.tsx'
import PlayButton from '../components/home/play.tsx'
import LoginButton from '../components/home/login.tsx'

export default function HomePage({ setScreen }: {setScreen: Function}){
    return(
        <div className="flex mt-5 gap-y-5 gap-x-[100%] flex-wrap justify-center">
            <Profile />
            <PlayButton setScreen={setScreen}/>
            <LoginButton />
        </div>
    )
}