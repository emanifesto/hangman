import { type JSX } from "react"

export default function Keyboard({ keyClick }: {keyClick: Function}){
    return(
        <div className="bg-[#cad9fa] p-5 rounded-xl w-min hidden lg:block">
            <KeyboardRow letters="QWERTYUIOP" keyClick={keyClick} />
            <KeyboardRow letters="ASDFGHJKL" keyClick={keyClick} />
            <KeyboardRow letters="ZXCVBNM" keyClick={keyClick} />
        </div>
    )
}

function KeyboardRow( {letters, keyClick}: {letters: string, keyClick: Function}  ){
    return(
        <div className="gap-2.5 flex justify-center my-2">
            {letters.split('').map((letter: string): JSX.Element => {
                return(
                    <Key key={letter} text={`Key${letter}`} keyClick={keyClick}/>
                )
            })}
        </div>
    )
}

function Key( {text, keyClick}:{text: string, keyClick: Function}){
    const keyAnimation: string = "ease-out active:translate-0.5 duration-300 "
    return(
        <div>
            <button className="relative z-0" onClick={() => keyClick(text)}>
                <div id={text} className={`${keyAnimation} size-12 content-center place-items-center bg-[#79abf2] rounded-md font-bold`}>
                    <p className="size-fit select-none">{text.startsWith('Key') ? text[3]: text}</p>
                </div>
                <div className="size-12 bg-[#5078b4] absolute top-1 left-1 rounded-md -z-1 border-2">
                </div>
            </button>
        </div>
    )
}