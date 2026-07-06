import "./Letter.css"

export default function Letter({ value, used, correct, handleClick }) {
    return (
        <button className={used?correct?"right letter":"wrong letter":"letter"}
            onClick={handleClick}
        >{value}</button>
    )
}