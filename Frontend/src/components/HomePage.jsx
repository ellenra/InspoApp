import { useState, useEffect } from "react"
import Login from "./LoginForm"
import pictureService from '../services/pictureservice'
import '../styles/pictures.css'

const Home = () => {
    const [pictures, setPictures] = useState([])
    const [user, setUser] = useState(null)

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

    const handleLike = async (userId, pictureId) => {
        try {
            await pictureService.like(userId, pictureId)            
        } catch (error) {
            console.error('Error, could not like picture:', error)
        }
    }

    return (
        <div>
            <Login onLogin={(loggedInUser) => setUser(loggedInUser)}/>
            <br></br>
            <div>
                <div className="layout">
                    {pictures.map((picture) => (
                        <div key={picture.id} className="picture">
                            <img src={picture.url} alt={picture.description} />
                            {user && (
                                <button
                                className="like-button"
                                onClick={() => handleLike(user.id, picture.id)}></button>
                            )}                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home