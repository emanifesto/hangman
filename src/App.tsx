import { useState } from 'react'
import NavigationMenu from './components/nav'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationMenu menuSelection={'home'}>
        <p>Word for word, Bar for bar</p>
      </NavigationMenu>
    </>
  )
}

export default App
