export default function Timer({timeLeft}: {timeLeft: number}){
    const timerAnimation: string = ""
    return(
        <div className="place-items-end pr-1 py-1 relative">
            <p className="w-12 p-3 rounded-[50%] bg-orange-400 font-bold">
                {timeLeft}
            </p>
            <span className={`animate-hourglass absolute left-0 top-0 h-full  bg-red-500 -z-1`}></span>
        </div>
    )
}