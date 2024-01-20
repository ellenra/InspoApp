import { useState } from "react"
import { useNavigate } from "react-router-dom"
import userService from '../services/userservice'
import pictureService from '../services/pictureservice'
import '../styles/register.css'
import '../styles/login.css'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('registration in process')
        try {
            const newUser = await userService.register({
                username, password, email
            })
            setUsername('')
            setPassword('')
            setEmail('')
            window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
            pictureService.setToken(newUser.token)
            navigate('/')
        } catch (exception) {
            console.log('error in registration', exception.message)
        }
    }

    return (
      <div className="body">
        <div className="register-form">
            <form onSubmit={handleRegister}>
            <div className="register-title">Register:</div>
            <div>
              Username:
              <input
                className="login_input"
                id='register_username'
                type="text"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
              />
            </div>
            <div>
              Password:
              <input
                className="login_input"
                id='register_password'
                type="text"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
              />
            </div>
            <div>
              Email address:
              <input
                className="login_input"
                id='email'
                type="text"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email"
              />
            </div>
            <button className="login-button" id="register-button" type="submit">Create account</button>
            </form>
          </div>
        </div>
    )
}

export default Register