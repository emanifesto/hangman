import { useEffect, useState } from 'react'
import FillInTheBlanks from "../components/game/blanks.tsx"
import Keyboard from '../components/game/keyboard.tsx'

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

const evaluateGuess: Function = (guess: string, hiddenWords: string): string => {
    if (word.includes(guess)){
        const hiddenWordsArray: string[] = hiddenWords.split('')
        const replacementIndexes: number[] = findGuessIndexes(guess)
        for (const index of replacementIndexes){
            hiddenWordsArray[index] = guess
        }
        return hiddenWordsArray.join('')
    }
    return hiddenWords
}

export default function Game(){
    // const [guess, setGuess] = useState<string>('')
    const [hiddenWords, setHiddenWords] = useState<string>(hideWord(word))
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [hiddenWords])

    const handleKeyDown = (key: KeyboardEvent | string): void => {
        let keyPressed: string

        if (key instanceof KeyboardEvent){
            keyPressed = key.code
        }else{
            keyPressed = key 
        }

        if (keyPressed.startsWith('Key')){
            const letter: string = keyPressed[3]
            const newHiddenWords: string = evaluateGuess(letter, hiddenWords)
            if (hiddenWords == newHiddenWords){

            }else{
                setHiddenWords(newHiddenWords)
            }
            // setGuess((prev) => prev.concat(letter.toUpperCase()))
        }

        // if (keyPressed == "Backspace"){
        //     setGuess((prev) => prev.slice(0, prev.length - 1))
        // }
        
        // if (keyPressed == "Space"){
        //     setGuess((prev) => prev.concat(' '))
        // }

        // if (keyPressed == "Enter"){
        //     const newHiddenWord: string = evaluateGuess(guess, hiddenWord)

        //     if (hiddenWord == newHiddenWord){

        //     } else {
        //         setHiddenWord(newHiddenWord)
        //     }
        //     setGuess('')
        // }
    }

    return(
        <div className="border-6">
            <FillInTheBlanks words={hiddenWords} />
            <Keyboard keyClick={handleKeyDown} />
        </div>
    )
}