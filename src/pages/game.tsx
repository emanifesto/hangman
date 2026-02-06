import { useEffect, useState } from 'react'
import Timer from '../components/game/timer.tsx'
import FillInTheBlanks from "../components/game/blanks.tsx"
import Category from '../components/game/category.tsx'
import Lives from '../components/game/lives.tsx'
import Keyboard from '../components/game/keyboard.tsx'
import MobileInputField from '../components/game/input.tsx'

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
    const [hiddenWords, setHiddenWords] = useState<string>(hideWord(word))
    const [timeLeft, setTimeLeft] = useState<number>(45)

    useEffect(() => {
        const timerInterval: number = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        if (timeLeft < 1){
            clearInterval(timerInterval)
        }

        return () => {
            clearInterval(timerInterval)
            }
    }, [timeLeft])

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
            const visualKey: HTMLElement|null = document.getElementById(keyPressed)
            if (visualKey?.getAnimations().length == 0)
                visualKey?.animate([{transform: "translateX(2px) translateY(2px)"}], {duration: 300, easing: "ease-out"})
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
        }
    }

    return(
        <div className="flex flex-wrap lg:grid grid-cols-11 justify-around gap-3 grid-rows-10 lg:px-5 lg:pb-4 h-[95vh] max-h-[95vh] overflow-y-hidden bg-[#79abf2] shadow-2xl">
            <Timer timeLeft={timeLeft}/>
            <FillInTheBlanks words={hiddenWords} />
            <Category />
            <Lives />
            <Keyboard keyPress={handleKeyDown} />
            {window.innerWidth < 1024 && <MobileInputField keyPress={handleKeyDown}/>}
        </div>
    )
}