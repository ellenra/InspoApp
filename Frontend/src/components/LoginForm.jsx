import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import loginService from '../services/loginservice'
import '../styles/index.css'
import '../styles/login.css'
import pictureService from '../services/pictureservice'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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


    if (user === null) {
      return (
          <div className="login-form">
          <div>
            <p>Log in to upload and save pictures!</p>
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
            <button className="button" id="login-button" type="submit">Login</button>
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
      null
    )
}

export default Login