import { useState } from 'react'

export default function MobileInputField( {keyPress}: {keyPress: Function}){
    const [userInput, setUserInput] = useState<string>('')

        

    return(
        <input 
            id="inputField" 
            onInput={(event: any) => {
                let text: string = event.nativeEvent.data
                const field: HTMLInputElement = document.getElementById("inputField") as HTMLInputElement

                if (text)
                    text = text.toUpperCase()

                if (text && !(userInput.includes(text)) && text.match(/[a-zA-Z]/)){
                    setUserInput(prev => prev.concat(text))
                    field.value = userInput.concat(text)
                    keyPress(`Key${text}`)
                }else{
                    field.value = userInput
                }
            }}
            className="bg-[ghostwhite] w-[80%] h-[4ch] text-center">
        </input>
    )
}