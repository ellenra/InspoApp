import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./LoginForm"
import PictureForm from "./PictureForm"
import pictureService from '../services/pictureservice'
import userService from '../services/userservice'
import '../styles/pictures.css'
import '../styles/index.css'


const Home = () => {
    const [pictures, setPictures] = useState([])
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

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
  
      }
  
    const goToProfile =  async () => {
        navigate(`/users/${user.id},`, { state: { user } })
    }

    const handleLike = async (userId, pictureId) => {
        try {
            await userService.likePicture(userId, pictureId)
        } catch (error) {
            console.error('Error, could not like picture:', error)
        }
    }

    const handleNewPicture = async ({ url, title, description }) => {
        try {
            const picToAdd = await pictureService.create({ url, title, description })
            setPictures((pictures) => [...pictures, picToAdd])
            console.log('pic added')
        } catch {
            console.log('could not add pic')
        }
    }

    return (
        <div>
            <div className="footer">
                <em>Dreamify. Get inspired.</em>
            </div>
            <div className="body">
                <p>Dreamify.</p>
            </div>
            <br />
            {user !== null && <button className="button" id="logout-button" onClick={handleLogout}>Log out</button>}
            {user !== null && <button className="button" id="profile-button" onClick={goToProfile}>Profile page</button>}
            {user !== null && <PictureForm handleNewPicture={handleNewPicture} />}
            {user === null && <Login onLogin={(loggedInUser) => setUser(loggedInUser)}/>}
            <div>
      </div>
            <br />
            <div>
                <div className="layout">
                    {pictures.map((picture) => (
                        <div key={picture.id} className="picture">
                            <img src={picture.url} alt={picture.description} />
                            {user ? (
                                <button
                                className="like-button"
                                onClick={() => handleLike(user.id, picture.id)}></button>
                            ) : null}                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home