import { useEffect, useState } from 'react'
import FillInTheBlanks from "../components/game/blanks.tsx"

const word: string = "Agent00's Best Stream".toUpperCase()
const hideWord: Function = (word: string): string => {
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

const evaluateGuess: Function = (guess: string, hiddenWord: string): string => {
    if (word.includes(guess)){
        const hiddenWordArray: string[] = hiddenWord.split('')
        const replacementIndexes: number[] = findGuessIndexes(guess)
        for (const index of replacementIndexes){
            hiddenWordArray[index] = guess
        }
        return hiddenWordArray.join('')
    }
    return hiddenWord
}

export default function Game(){
    const [guess, setGuess] = useState<string>('')
    const [hiddenWord, sethiddenWord] = useState<string>(hideWord(word))
    
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
            const newhiddenWord: string = evaluateGuess(guess, hiddenWord)

            if (hiddenWord == newhiddenWord){

            } else {
                sethiddenWord(newhiddenWord)
            }
            setGuess('')
        }
    }

    return(
        <div className="border-6">
            <p className="text-black text-5xl">This is not a drill!!</p>

            <FillInTheBlanks words={hiddenWord}/>
        </div>
    )
}