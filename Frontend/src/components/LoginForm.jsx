import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginService from '../services/loginservice'
import '../styles/index.css'
import '../styles/login.css'
import pictureService from '../services/pictureservice'
import PictureForm from './PictureForm'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            pictureService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            if (onLogin) {
              onLogin(user)
            }
        } catch (exception) {
            console.log('error in login')
        }
    }

    const handleLogout = () => {
      window.localStorage.removeItem('loggedUser')
      pictureService.setToken(null)
      setUser(null)

    }

    const handleNewPicture = async ({ url, title, description }) => {
      try {
          const picToAdd = await pictureService.create({ url, title, description })
          setPictures(pictures.concat(picToAdd))
          console.log('pic added')
      } catch {
          console.log('could not add pic')
      }
  }


  const goToProfile = () => {
    navigate(`/users/${user.id},`, { state: { user } })
  }


    if (user === null) {
      return (
          <div className='body'>
          <div className="login">
          <h1>InspoApp</h1>
          <form onSubmit={handleLogin}>
            <div>
            Username:
              <input
                className="login_input"
                id='username'
                type="text"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
            Password:
              <input
                className="login_input"
                id='password'
                type="text"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button className="login_button" id="login-button" type="submit">Login</button>
          <div>
            Don't have an account?
            <br ></br>
            <Link to="/register">Register here</Link>
            <br></br>
          </div>
          </form>
        </div>
        </div>
      )
    }

    return (
      <div>
        <button id="logout-button" onClick={handleLogout}>Log out</button>
        <button id="profile-button" onClick={goToProfile}>Profile page</button>
        <PictureForm handleNewPicture={handleNewPicture} />
      </div>
    )
}

export default Login