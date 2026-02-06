import { type JSX } from "react"

export default function FillInTheBlanks({ words }: {words: string}){
    const wordArray:string[] = words.split(' ')
    

    const wordToJSX: Function = (word: string, key: number) => {
        const letters: string[] = word.split('')
        return(
            <div key={key} className="flex mt-2 gap-2 w-min">
                {letters.map((letter: string, index: number): JSX.Element => {
                    const renderedLetter: JSX.Element = letter == "_" ? <Blank /> : <p className="text-xl lg:text-5xl">{letter}</p>
                    return(
                        <div key={index}>
                            {renderedLetter}
                        </div>
                    )
                })}
            </div>
        )
    }

    const wordsToJSX: Function = (wordArray: string[]) => {
        return(
            <div className="mx-3 -mt-3 flex flex-wrap gap-x-6 lg:gap-x-9 justify-center">
                {wordArray.map((word, key) => wordToJSX(word, key))}
            </div>
        )
    }

    return(
        <div className="bg-[#cad9fa] rounded-md w-[90%] content-center lg:w-full col-span-8 row-span-4 inset-shadow-sm inset-shadow-[#5078b4]">
            {wordsToJSX(wordArray)}
        </div>
    )
}

function Blank(){
    return(
        <p className="border-b-2 w-3 lg:w-10 mt-6 lg:mt-12">
        </p>
    )
}