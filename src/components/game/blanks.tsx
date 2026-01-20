const word: string = "Agent00's Best Stream"

export default function FillInTheBlanks(){
    const wordToBlank: Function = (word: string): string => {
        return word.replace(/[a-zA-Z]/g, "_")
    }
    const blankedWord = wordToBlank(word)
    const sections:string[] = blankedWord.split(' ')

    const sectionToHTML: Function = (section: string) => {
        const letters: string[] = section.split('')
        return(
            <div className="flex mx-4 gap-1 w-min">
                {letters.map((letter: string, index: number): any => {
                    const ret: any = letter == "_" ? <Blank /> : <p>{letter}</p>
                    return(
                        <div key={letter+index}>
                            {ret}
                        </div>
                    )
                })}
            </div>
        )
    }

    return(
        <div className="border-2">
            <div className="my-3 flex flex-wrap justify-center">
                {sectionToHTML(sections[0])}
                {sectionToHTML(sections[1])}
                {sectionToHTML(sections[2])}
            </div>
        </div>
    )
}

function Blank(){
    return(
        <p className="border-b-2 w-4 mt-[1lh]">
        </p>
    )
}