import "./Letter.css"

export default function Letter(props) {
    const { value, usage } = props
    return (
        <button className="letter">{value}</button>
    )
}