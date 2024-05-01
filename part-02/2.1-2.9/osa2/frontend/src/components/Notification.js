const Notification = ({ notificationType, message }) => {
    if (message === null) {
        return null
    }

    console.log("Type " + notificationType + " was passed to the Nofitication module.")

    return (
        <div className={`${notificationType}`}>
            {message}
        </div>
    )
}

export default Notification