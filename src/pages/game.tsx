import FillInTheBlanks from "../components/game/blanks.tsx"

export default function Game(){
    return(
        <div className="border-6">
            <p className="text-black text-5xl">This is not a drill!!</p>

            <FillInTheBlanks />
        </div>
    )
}