import { useState } from 'react'
import NavigationMenu from './pages/nav.tsx'
import Home from './pages/home.tsx'
import Leaderboard from './pages/leaderboard.tsx'
import './App.css'

function App() {
  const [menuSelection, setMenuSelection] = useState<string>('Home')
  const [isLoggedin, setLoggedIn] = useState<boolean>(false)
  
  return (
    <main className="m-auto w-4/5">
      <NavigationMenu menuSelection={menuSelection} setMenuSelection={setMenuSelection}>
        <Home />
      </NavigationMenu>
    </main>
  )
}

export default App
