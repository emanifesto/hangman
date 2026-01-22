import { useEffect, useState } from 'react'
import FillInTheBlanks from "../components/game/blanks.tsx"

const word: string = "Agent00's Best Stream".toUpperCase()
const wordToBlank: Function = (word: string): string => {
    return word.replace(/[a-zA-Z]/g, "_")
}

const findGuessIndexes: Function = (guess: string): number[] => {
    const indexes: number[] = []
    for (let i = 0; i < word.length; i++){
        if (word.charAt(i) == guess)
            indexes.push(i)
    }
    return indexes
}

const evaluateGuess: Function = (guess: string, blankedWord: string): string => {
    if (word.includes(guess)){
        const blankedWordArray: string[] = blankedWord.split('')
        const replacementIndexes: number[] = findGuessIndexes(guess)
        for (const index of replacementIndexes){
            blankedWordArray[index] = guess
        }
        return blankedWordArray.join('')
    }
    return blankedWord
}

export default function Game(){
    const [guess, setGuess] = useState<string>('')
    const [blankedWord, setBlankedWord] = useState<string>(wordToBlank(word))
    console.log(guess)
    
    useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
        document.removeEventListener('keydown', handleKeyDown)
    }

    }, [guess])

    const handleKeyDown = (event:KeyboardEvent): void => {
        const keyPressed: string = event.code
        if (keyPressed.startsWith('Key')){
            const letter: string = keyPressed[3]
            setGuess((prev) => prev.concat(letter.toUpperCase()))
        }
        
        if (keyPressed == "Space"){
            setGuess((prev) => prev.concat(' '))
        }

        if (keyPressed == "Enter"){
            const newBlankedWord: string = evaluateGuess(guess, blankedWord)

            if (blankedWord == newBlankedWord){
                console.log(blankedWord)
            } else {
                setBlankedWord(newBlankedWord)
            }

            setGuess('')
        }
    }

    return(
        <div className="border-6">
            <p className="text-black text-5xl">This is not a drill!!</p>

            <FillInTheBlanks word={blankedWord}/>
        </div>
    )
}