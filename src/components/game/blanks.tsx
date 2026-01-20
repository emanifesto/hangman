export default function FillInTheBlanks({ word }: {word: string}){
    const sections:string[] = word.split(' ')

    const sectionToHTML: Function = (section: string, key: number) => {
        const letters: string[] = section.split('')
        return(
            <div key={key} className="flex mx-4 gap-1 w-min">
                {letters.map((letter: string, index: number): any => {
                    const ret: any = letter == "_" ? <Blank /> : <p>{letter}</p>
                    return(
                        <div key={index}>
                            {ret}
                        </div>
                    )
                })}
            </div>
        )
    }

    const sectionsToHTML: Function = (sections: string[]) => {
        return(
            <div className="my-3 flex flex-wrap justify-center">
                {sections.map((section, key) => sectionToHTML(section, key))}
            </div>
        )
    }

    return(
        <div className="border-2">
            {sectionsToHTML(sections)}
        </div>
    )
}

function Blank(){
    return(
        <p className="border-b-2 w-4 mt-[1lh]">
        </p>
    )
}