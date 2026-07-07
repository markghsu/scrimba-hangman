import "./WordLetter.css"

export default function({ value, missed }) {
    return (
        <span className={`word-letter ${missed?"missed":""}`}>{value}</span>
    )
}