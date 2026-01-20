import FillInTheBlanks from "../components/game/blanks.tsx"

export default function Game(){
    const word: string = "Agent00's Best Stream"
    const wordToBlank: Function = (word: string): string => {
        return word.replace(/[a-zA-Z]/g, "_")
    }
    const blankedWord = wordToBlank(word)

    return(
        <div className="border-6">
            <p className="text-black text-5xl">This is not a drill!!</p>

            <FillInTheBlanks word={word}/>
        </div>
    )
}