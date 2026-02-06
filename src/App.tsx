import { useState } from 'react'
import NavigationMenu from './pages/nav.tsx'
import HomePage from './pages/home.tsx'
import LeaderboardPage from './pages/leaderboard.tsx'
import Game from './pages/game.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'

function App() {
  const [screen, setScreen] = useState<string>('Menu')
  const [menuSelection, setMenuSelection] = useState<string>('Home')
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

  let display
  switch(screen){
    case 'Menu':
      display = (
        <NavigationMenu  menuSelection={menuSelection} setMenuSelection={setMenuSelection}>
          {menuSelection == 'Leaderboard' ? 
            <LeaderboardPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /> : 
            <HomePage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} setScreen={setScreen} />
          }
        </NavigationMenu>)
      break

    case 'Game':
      display = (<Game />)
      break
  }

  return (
    <GoogleOAuthProvider clientId="844094970191-7fceof5l4j4hngbopmdb1142t1eh0kot.apps.googleusercontent.com">
    <main className="bg-[url(public/main_background.svg)] h-screen">
      {display}
    </main>
    </GoogleOAuthProvider>
  )
}

export default App
