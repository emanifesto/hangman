export default function Timer({timeLeft}: {timeLeft: number}){
    return(
        <div className="place-items-end pr-1 py-1 relative z-0 overflow-hidden rounded-sm w-full col-span-11 row-span-1 shadow-sm">
            <p className="w-12 p-3 rounded-[50%] bg-black/40 font-bold">
                {timeLeft}
            </p>
            <span className={`animate-hourglass absolute left-0 top-0 h-full bg-[#e65555] -z-1 overflow-hidden
                after:bg-[#7c1717] after:h-[300%] after:w-8 after:absolute after:-top-3 after:left-[98%] after:animate-flash`}>
                <span className="h-[120%] -left-full -top-1 w-4 bg-[#7c1717] absolute -skew-30 animate-pulsate" />
                <span className="h-[120%] -left-full -top-1 w-4 bg-[#7c1717] absolute -skew-30 [animation-delay:500ms] animate-pulsate" />
                <span className="h-[120%] -left-full -top-1 w-4 bg-[#7c1717] absolute -skew-30 [animation-delay:1000ms] animate-pulsate" />
                <span className="h-[120%] -left-full -top-1 w-4 bg-[#7c1717] absolute -skew-30 [animation-delay:1500ms] animate-pulsate" />
            </span>
        </div>
    )
}