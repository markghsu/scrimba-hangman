import './Message.css'

export default function Message(props) {
    return (
        <div className={`message-box ${props.className?props.className:""}`}>
            <h2 className="message-main">{props.main}</h2>
            {props.subtitle && <p className="message-subtitle">{props.subtitle}</p>}
        </div>)
}