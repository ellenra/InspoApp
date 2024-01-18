import { useState } from "react"
import userService from '../services/userservice'

const Register = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('registration in process')
        try {
            await userService.register({
                username, password, email
            })
            setUsername('')
            setPassword('')
            setEmail('')
        } catch (exception) {
            console.log('error in registration', exception.message)
        }
    }

    return (
        <div>
            Register:
            <form onSubmit={handleRegister}>
            <div>
            Username:
              <input
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
                id='email'
                type="text"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email"
              />
            </div>
            <button id="register-button" type="submit">Register</button>
          </form>
        </div>
    )
}

export default Register