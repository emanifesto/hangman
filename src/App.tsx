import { useState } from 'react'
import NavigationMenu from './components/nav.tsx'
import Profile from './components/home/profile.tsx'

import './App.css'

function App() {
  const [menuSelection, setMenuSelection] = useState<string>('Home')
  const [isLoggedin, setLoggedIn] = useState<boolean>(false)
  
  return (
    <main className="m-auto w-4/5">
      <NavigationMenu menuSelection={menuSelection} setMenuSelection={setMenuSelection}>
        <Profile />
      </NavigationMenu>
    </main>
  )
}

export default App
