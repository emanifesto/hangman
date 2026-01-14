import { useState } from 'react'
import NavigationMenu from './components/nav'
import './App.css'

function App() {
  const [menuSelection, setMenuSelection] = useState<string>('Home')
  
  return (
    <main className="m-auto w-4/5">
      <NavigationMenu menuSelection={menuSelection} setMenuSelection={setMenuSelection}>
        <p>Something!</p>
      </NavigationMenu>
    </main>
  )
}

export default App
