import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import pictureService from "../services/pictureservice"
import userService from "../services/userservice"


const Profile = () => {
    const location = useLocation()
    const { user } = location.state
    const [pictures, setPictures] = useState([])
    const [likedPictures, setLikedPictures] = useState([])

    useEffect(() => {
        const fetchPictures = async () => {
          try {
            const fetchPictures = await userService.getUserPictures(user.id)
            setPictures(fetchPictures)
          } catch (error) {
            console.error('Error fetching pictures:', error)
          }
        }
    
        fetchPictures()
      }, [user.pictures])

    useEffect(() => {
      const fetchLikedPictures = async () => {
        try {
          const likedPictures = await userService.getLikedPictures(user.id)
          console.log(likedPictures)
          setLikedPictures(likedPictures || [])
        } catch (error) {
          console.error('Error fetching pictures:', error)
        }
      }
  
      fetchLikedPictures()
    }, [])


    const handleDelete = async (pictureId) => {
      if(window.confirm('Delete picture?')) {
        try {
          await pictureService.deleteById(pictureId)
          console.log('made it here')
          setPictures((prevPictures) => prevPictures.filter((p) => p.id !== pictureId))
          console.log('made it further')
        } catch (exception) {
          console.error('error:', exception)
        }
      }
    }
  
    return (
        <div>
            <h2>{user.username}</h2>
            <p>Own pictures</p>
            <div className="layout">
                    {pictures.map((picture) => (
                        <div key={picture.id} className="picture">
                            <img src={picture.url} alt={picture.description} />
                            <button className="delete-button" onClick={() => handleDelete(picture.id)}>delete</button>
                        </div>
                    ))}
            </div>
            <p>Liked pictures</p>
            <div className="layout">
                    {likedPictures.map((picture) => (
                        <div key={picture.id} className="picture">
                            <img src={picture.url} alt={picture.description} />
                        </div>
                    ))}
            </div>

        </div>
    )
}

export default Profile
