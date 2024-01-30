import { useSelector } from "react-redux"
import "../styles/index.css"

const Notification = () => {
    const { notification_message } = useSelector((state) => state.notification)

    if (notification_message) {
        return (
            <div className="notification">
                {notification_message}
            </div>
        )
    }
    return null
}


export default Notification