import { useState } from 'react'
import NavigationMenu from './pages/nav.tsx'
import Home from './pages/home.tsx'
import Leaderboard from './pages/leaderboard.tsx'
import './App.css'

function App() {
  const [menuSelection, setMenuSelection] = useState<string>('Home')
  const [isLoggedin, setLoggedIn] = useState<boolean>(false)
  
  return (
    <main className="m-auto">
      <NavigationMenu menuSelection={menuSelection} setMenuSelection={setMenuSelection}>
        {menuSelection == 'Leaderboard' ? <Leaderboard /> : <Home />}
      </NavigationMenu>
    </main>
  )
}

export default App
