import { type JSX } from 'react'
import LoginBanner from './banner'

const players: Array<[string, number]>= [['Jeremy', 40], ['Sarah', 39], ['Phil', 36],
['John', 32], ['Ant', 28], ['Sheyla', 10] ]

export default function Leaderboard({ isLoggedIn, setLoggedIn }: {isLoggedIn: boolean, setLoggedIn: Function}){
    return(
        <div className="border-black/50 border-4 mt-3 max-w-220 mx-auto rounded-xl bg-purple-700 text-white">
            <Filter />
            <Entries isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} entries={players} />
            <Navigation />
        </div>
    )
}

function Filter(){
    return(
        <div className="flex justify-center border-b-4 bg-purple-800 rounded-t-lg">
            <button className="w-[33%] border-r-2 py-2 px-3">Daily</button>
            <button className="w-[33%] border-r-2 py-2 px-3">Weekly</button>
            <button className="w-[33%] py-2 px-3">All-Time</button>
        </div>
    )
}

function Entries( {entries, isLoggedIn, setLoggedIn}: {entries: Array<[string, number]>, isLoggedIn: boolean, setLoggedIn: Function}){
    const main: JSX.Element = <ol>{entries.map(person => {
        return(
            <li key={person[0]}><Entry name={person[0]} score={person[1]}/></li>
        )
    })}</ol>

    return(
        <div className="h-[35vh] overflow-auto">
            {!isLoggedIn && <LoginBanner setLoggedIn={setLoggedIn} />}
            {main}
        </div>
    )
}

function Entry ( {name, score}: {name: string, score: number} ){
    return(
        <div className="flex px-3 items-center bg-purple-600 border-b">
            <p>{name}</p>
            <p className="ml-auto bg-purple-700 px-2 py-1 my-1 rounded-md">{score}</p> 
        </div>
    )
}

function Navigation(){
    return(
        <div className="flex gap-3 my-2 justify-center items-center">
            <svg viewBox="0 0 30 30" className="fill-white/50 size-6">
                <polygon points="0 15, 15 0, 12 8, 28 8, 28 22, 12 22, 15 30" />
            </svg>
            <input className="text-xl place-items-center text-white bg-black/50 size-8 rounded-md"></input>
            <svg viewBox="0 0 30 30" className="fill-white/50 size-6 rotate-180">
                <polygon points="0 15, 15 0, 12 8, 28 8, 28 22, 12 22, 15 30" />
            </svg>
        </div>
    )
}