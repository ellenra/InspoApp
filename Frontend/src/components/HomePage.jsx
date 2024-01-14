import { useState, useEffect } from "react"
import Login from "./LoginForm"
import PictureForm from "./PictureForm"
import pictureService from '../services/pictureservice'
import '../styles/pictures.css'

const Home = () => {
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        pictureService.getAll().then(pictures => 
            setPictures( pictures )
        )
    }, [])

    const handleNewPicture = async ({ url, title, description }) => {
        try {
            const picToAdd = await pictureService.create({ url, title, description })
            setPictures(pictures.concat(picToAdd))
            console.log('pic added')
        } catch {
            console.log('could not add pic')
        }
    }

    return (
        <div>
            <Login />
            <div>
                <h2>InspoApp</h2>
                <PictureForm handleNewPicture={handleNewPicture} />
                <div className="layout">
                    {pictures.map((picture) => (
                        <div key={picture.id} className="picture">
                            <img src={picture.url} alt={picture.description} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home