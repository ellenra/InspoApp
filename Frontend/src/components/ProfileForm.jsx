import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setNotification } from "../redux/notificationReducer"
import pictureService from "../services/pictureservice"
import userService from "../services/userservice"
import "../styles/profile.css"


const Profile = () => {
    const location = useLocation()
    const { user } = location.state
    const [pictures, setPictures] = useState([])
    const [likedPictures, setLikedPictures] = useState([])
    const [tab, setTab] = useState("ownPictures")
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
    }, [user.likedPictures])


    const handleDelete = async (pictureId) => {
      if(window.confirm('Delete picture?')) {
        try {
          await pictureService.deleteById(pictureId)
          setPictures((prevPictures) => prevPictures.filter((p) => p.id !== pictureId))
          dispatch(setNotification('Picture deleted!'))
        } catch (exception) {
          console.error('error:', exception)
        }
      }
    }

    const handleDeleteLike = async (userId, pictureId) => {
      if(window.confirm('Delete from profile?')) {
        try {
          await userService.deleteLike(userId, pictureId)
          setLikedPictures((prevPictures) => prevPictures.filter((p) => p.id !== pictureId))
        } catch (exception) {
          console.error('error:', exception)
        }
      }
    }
    
    const handleChange = (tab) => {
      setTab(tab)
    }

    const goToHomepage = async (event) => {
      event.preventDefault()
      navigate('/')
    }

    return (
        <div className="profile">
          <button className="home-button" onClick={goToHomepage}>Home</button>
          <h2>{user.username}</h2>
          <div className="tabs">
            <button className="profile-button" onClick={() => handleChange("ownPictures")}>Own pictures</button>
            <button className="profile-button" onClick={() => handleChange("savedPictures")}>Saved pictures</button>
          </div>
          <div className="layout">
            {(tab === "ownPictures" ? pictures : likedPictures).map((picture) => (
            <div key={picture.id} className="picture">
              <img src={picture.url} alt={picture.description}/>
              <button className="delete-button"
                onClick={() => (activeTab === "ownPictures" ? handleDelete(picture.id) : handleDeleteLike(user.id, picture.id))}>
                Delete
              </button>
            </div>
            ))}
          </div>
        </div>
    )
}

export default Profile
