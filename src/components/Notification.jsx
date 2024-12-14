const Notification = ({text, type}) => {
    if (text === null) {
        return null
    }
    else return (
        <div className={type}>
            {text}
        </div>
    )
}

export default Notification