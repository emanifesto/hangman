import { useState } from 'react'
import NavigationMenu from './pages/nav.tsx'
import HomePage from './pages/home.tsx'
import LeaderboardPage from './pages/leaderboard.tsx'
import Game from './pages/game.tsx'
import './App.css'

function App() {
  const [screen, setScreen] = useState<string>('Menu')
  const [menuSelection, setMenuSelection] = useState<string>('Home')
  // const [isLoggedin, setLoggedIn] = useState<boolean>(false)

  let display
  switch(screen){
    case 'Menu':
      display = (<NavigationMenu  menuSelection={menuSelection} setMenuSelection={setMenuSelection}>
        {menuSelection == 'Leaderboard' ? <LeaderboardPage /> : <HomePage setScreen={setScreen} />}
        </NavigationMenu>)
      break

    case 'Game':
      display = (<Game />)
      break
  }

  return (
    <main className="bg-[url(src/assets/main_background.svg)] h-screen">
      {display}
    </main>
  )
}

export default App
