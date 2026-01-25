export default function Timer({timeLeft}: {timeLeft: number}){
    return(
        <div className="place-items-end">
            <p className="w-12 p-3 rounded-[50%] bg-orange-400 font-bold">
                {timeLeft}
            </p>
        </div>
    )
}