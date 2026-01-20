const word: string = "Agent00's Best Stream"

export default function FillInTheBlanks(){
    const wordToBlank: Function = (word: string): string => {
        return word.replace(/[a-zA-Z]/g, "_")
    }
    const blankedWord = wordToBlank(word)
    const sections:string[] = blankedWord.split(' ')

    return(
        <div className="border-2">
            <p>
                {sections[0]}
            </p>
            <p>
                {sections[1]}
            </p>
            <p>
                {sections[2]}
            </p>
        </div>
    )
}