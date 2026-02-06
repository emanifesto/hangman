import Profile from '../components/home/profile.tsx'
import PlayButton from '../components/home/play.tsx'
import LoginButton from '../components/home/login.tsx'

export default function HomePage({ setScreen, isLoggedIn, setLoggedIn }: {setScreen: Function, isLoggedIn: boolean, setLoggedIn: Function}){
    return(
        <div className="flex mt-5 gap-y-5 pb-4  gap-x-[100%] flex-wrap justify-center">
            <Profile /> {/*display "welcome to hangman" typewriter animated effect if not logged in*/}
            <PlayButton setScreen={setScreen}/>
            <LoginButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        </div>
    )
}