export default function PlayButton({setScreen}: {setScreen: Function}){
    return(
        <button onClick={() => setScreen("Game")}className=" px-7 size-fit pb-2 text-[2em] rounded-2xl bg-blue-700/80">
            Play
        </button>
    )
}