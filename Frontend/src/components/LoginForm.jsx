import { useState, useEffect } from 'react'
import loginService from '../services/loginservice'
import '../styles/index.css'
import '../styles/login.css'
import pictureService from '../services/pictureservice'


const Login = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
        } catch (exception) {
            console.log('error in login')
        }
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
          </form>
        </div>
        </div>
      )
    }
}

export default Login