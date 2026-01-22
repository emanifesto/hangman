import { type JSX } from "react"

export default function Keyboard({ keyClick }: {keyClick: Function}){
    return(
        <div className="bg-blue-600/30 p-5 rounded-xl w-min hidden lg:block">
            <KeyboardRow letters="QWERTYUIOP" keyClick={keyClick} />
            <KeyboardRow letters="ASDFGHJKL" keyClick={keyClick} />
            <KeyboardRow letters="ZXCVBNM" keyClick={keyClick} />
            {/* putting this on the backburner till I want to incorporate guessing the full word
             <ImportantKeys keyClick={keyClick} /> */}
        </div>
    )
}

function KeyboardRow( {letters, keyClick}: {letters: string, keyClick: Function}  ){
    const styling: string = "size-14 bg-blue-600/50 rounded-md font-bold" //[--key-size:(--spacing) * 14]
    return(
        <div className="gap-1 flex justify-center my-1">
            {letters.split('').map((letter: string): JSX.Element => {
                return(
                    <Key key={letter} text={'Key'+letter} styling={styling} keyClick={keyClick}/>
                )
            })}
        </div>
    )
}

function Key( {text, styling, keyClick}:{text: string, styling: string, keyClick: Function}){
    return(
        <button className={styling} onClick={() => keyClick(text)}>
            <p>{text.startsWith('Key') ? text[3]: text}</p>
        </button>
    )
}

// function ImportantKeys({ keyClick }: {keyClick: Function}){
//     return(
//         <div className="flex mx-auto w-[70%] gap-3 mt-4 text-white">
//             <Key text="Backspace" keyClick={keyClick} styling="basis-1/4 bg-orange-600/70 p-3 rounded-lg font-bold" />
//             <Key text="Space" keyClick={keyClick} styling="basis-1/2 p-3 bg-gray-600 rounded-lg font-bold" />
//             <Key text="Enter" keyClick={keyClick} styling="basis-1/4 bg-blue-600/90 p-3 rounded-lg font-bold" />
//         </div>
//     )
// }