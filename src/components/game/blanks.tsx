import { type JSX } from "react"

export default function FillInTheBlanks({ words }: {words: string}){
    const wordArray:string[] = words.split(' ')
    

    const wordToJSX: Function = (word: string, key: number) => {
        const letters: string[] = word.split('')
        return(
            <div key={key} className="flex mt-2 mx-4 gap-2 w-min">
                {letters.map((letter: string, index: number): JSX.Element => {
                    const renderedLetter: JSX.Element = letter == "_" ? <Blank /> : <p className="text-2xl">{letter}</p>
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
            <div className="my-3 flex flex-wrap justify-center">
                {wordArray.map((word, key) => wordToJSX(word, key))}
            </div>
        )
    }

    return(
        <div className="bg-[#cad9fa] py-1 rounded-md w-[90%] col-span-7 row-span-3">
            {wordsToJSX(wordArray)}
        </div>
    )
}

function Blank(){
    return(
        <p className="border-b-2 w-3 mt-8">
        </p>
    )
}