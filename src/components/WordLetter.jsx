import "./WordLetter.css"

export default function({value}) {
    console.log(`value:${value}:`)
    return (
        <span className="word-letter">{value}</span>
    )
}