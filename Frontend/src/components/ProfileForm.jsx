import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import pictureservice from "../services/pictureservice"


const Profile = () => {
    const location = useLocation()
    const { user } = location.state
    const [pictures, setPictures] = useState([])
    const [likedPictures, setLikedPictures] = useState([])

    console.log(user.id)

    useEffect(() => {
        const fetchPictures = async () => {
          try {
            const fetchPictures = user.pictures.map((pictureId) =>
              pictureservice.getById(pictureId)
            )
            const data = await Promise.all(fetchPictures)
            setPictures(data)
          } catch (error) {
            console.error('Error fetching pictures:', error)
          }
        }
    
        fetchPictures()
      }, [user.pictures])

    useEffect(() => {
      const fetchLikedPictures = async () => {
        try {
          const fetchPictures = user.likedPictures.map((pictureId) =>
            pictureservice.getById(pictureId)
          )
          const data = await Promise.all(fetchPictures)
          setLikedPictures(data)
        } catch (error) {
          console.error('Error fetching liked pictures:', error)
        }
      }
      fetchLikedPictures()
    }, [user.likedPictures])

    return (
        <div>
            <h2>{user.username}</h2>
            <p>Own pictures</p>
            <div className="layout">
                    {pictures.map((picture) => (
                        <div key={picture.id} className="picture">
                            <img src={picture.url} alt={picture.description} />
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
