import { useState } from "react"
import '../styles/index.css'

const PictureForm = ({ handleNewPicture }) => {
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const newPicture = async (event) => {
        event.preventDefault()
        handleNewPicture({ url, title, description })
        setUrl('')
        setTitle('')
        setDescription('')
    }

    return (
        <div>
          <h2>Add Picture</h2>
          <form onSubmit={newPicture}>
            <div>
                url:
              <input
                id='url'
                type="text"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="url"
              />
            </div>
            <div>
                title:
              <input
                id='title'
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="title"
              />
            </div>
            <div>
                description:
              <input
                id='description'
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="description"
              />
            </div>
            <button className="button" id='newpicture-button' type="submit">Add</button>
          </form>
        </div>
      )
}

export default PictureForm