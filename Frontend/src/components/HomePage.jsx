import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../redux/notificationReducer"
import Login from "./LoginForm"
import PictureForm from "./PictureForm"
import Notification from "./Notification"
import pictureService from '../services/pictureservice'
import userService from '../services/userservice'
import '../styles/pictures.css'
import '../styles/index.css'


const Home = () => {
    const [pictures, setPictures] = useState([])
    const [user, setUser] = useState(null)
    const [showPictureForm, setShowPictureForm] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          pictureService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        pictureService.getAll().then(pictures => 
            setPictures( pictures )
        )
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        pictureService.setToken(null)
        setUser(null)
        dispatch(setNotification('Logged out!'))
      }
  
    const goToProfile =  async () => {
        navigate(`/users/${user.id},`, { state: { user } })
    }

    const handleLike = async (userId, pictureId) => {
        try {
            await userService.likePicture(userId, pictureId)
            dispatch(setNotification('Picture saved to profile!'))
        } catch (exception) {
            console.log('error in liking picture')
            dispatch(setNotification(exception.response.data.error))
        }
    }

    const handleNewPicture = async ({ url, title, description }) => {
        try {
            const picToAdd = await pictureService.create({ url, title, description })
            setPictures((pictures) => [...pictures, picToAdd])
            dispatch(setNotification('New picture uploaded!'))
        } catch (exception) {
            console.log('could not add pic')
            dispatch(setNotification(exception.response.data.error))
        }
    }

    return (
        <div>
            {user === null &&
            <div className="body"> 
                <div className="app-name">
                    <p>Dreamify.</p>
                </div>
                <br />
                <div className="right-side">
                    <Login onLogin={(loggedInUser) => setUser(loggedInUser)}/>
                    <div className="note">Or start scrolling to get inspired...</div> 
                </div>
            </div>
            }
            <br />
            {user !== null && 
            <div>
                <button className="button" id="logout-button" onClick={handleLogout}>Log out</button>
                <button className="button" id="profile-button" onClick={goToProfile}>Profile page</button>
                <button className="button" onClick={() => setShowPictureForm((i) => !i)}>
                {showPictureForm ? 'Close form' : 'Upload picture'}</button>
                {showPictureForm && <PictureForm handleNewPicture={handleNewPicture} />  }          
             </div>
            }
            <br />
            <div> 
                <Notification /> 
            </div>
            <div className="layout">
                {pictures.map((picture) => (
                    <div key={picture.id} className="picture">
                        <img src={picture.url} alt={picture.description} />
                        {user ? (
                            <button className="like-button" onClick={() => handleLike(user.id, picture.id)}></button>
                        ) : null}                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home