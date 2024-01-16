import { useState } from "react"
import registerService from '../services/registerservice'

const Register = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('registration in process')
        try {
            await registerService.register({
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
              />
            </div>
            <button id="register-button" type="submit">Register</button>
          </form>
        </div>
    )
}

export default Register