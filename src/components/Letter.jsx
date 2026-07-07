import "./Letter.css"

export default function Letter({ value, used, correct, handleClick, disabled }) {
    return (
        <button className={used?correct?"right letter":"wrong letter":"letter"}
            onClick={handleClick}
            disabled={disabled}
        >{value}</button>
    )
}