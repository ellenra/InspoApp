import { useSelector } from "react-redux"
import "../styles/index.css"

const Notification = () => {
    const { goodNotification } = useSelector((state) => state.notification)

    if (goodNotification) {
        return (
            <div className="notification">
                {goodNotification}
            </div>
        )
    }
    return null
}


export default Notification