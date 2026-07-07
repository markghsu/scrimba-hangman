import "./Block.css"

export default function Block({ value, used, bgcolor = "#FFD742", color = "#1E1E1E" }) {
    const style={
        backgroundColor: bgcolor,
        color: color
    }
    return (
        <div className={used?"block used":"block"} style={style}>{ value }</div>
    )
}   