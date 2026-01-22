import { type JSX } from "react"

export default function Keyboard(){
    return(
        <div className="bg-blue-600/30 p-5 rounded-xl w-min hidden lg:block">
            <KeyboardRow letters="QWERTYUIOP" />
            <KeyboardRow letters="ASDFGHJKL" />
            <KeyboardRow letters="ZXCVBNM" />
            <ImportantKeys />
        </div>
    )
}

function KeyboardRow( {letters}: {letters: string}  ){
    return(
        <div className="gap-1 flex justify-center my-1">
            {letters.split('').map((letter: string): JSX.Element => {
                return(
                    <Key key={letter} letter={letter} />
                )
            })}
        </div>
    )
}

function Key( {letter}:{letter: string}){
    return(
        <button className="size-14 bg-blue-600/50 rounded-md font-bold"> {/*[--key-size:(--spacing) * 14]">*/}
            <p>{letter}</p>
        </button>
    )
}

function ImportantKeys(){
    return(
        <div className="flex mx-auto w-min gap-3 mt-3 text-white justify-between">
            <button className="bg-orange-600/70 p-3 rounded-lg font-bold">
                <p>Backspace</p>
            </button>
            <button className="p-3 bg-gray-600 rounded-lg font-bold">
                <p>Space</p>
            </button>
            <button className="bg-blue-600/90 p-3 rounded-lg font-bold">
                <p>Enter</p>
            </button>
        </div>
    )
}