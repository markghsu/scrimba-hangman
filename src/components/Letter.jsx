import "./Letter.css"

export default function Letter({ value, guessed, correct, handleClick, disabled }) {
    const status = guessed ? (correct ? "correct" : "wrong") : "not yet guessed"
    return (
        <button className={guessed?correct?"right letter":"wrong letter":"letter"}
            onClick={handleClick}
            disabled={disabled}
            aria-pressed={guessed}
            aria-label={`Letter ${value}, ${status}`}
        >{value}</button>
    )
}