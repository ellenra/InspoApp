import {
  Routes, Route, useMatch
} from 'react-router-dom'
import { useState, useEffect } from "react"
import Home from './components/HomePage'
import Login from './components/LoginForm'
import Register from './components/RegisterForm'
import Profile from './components/ProfileForm'
import userService from './services/userservice'


const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
      userService.getAll().then(users => 
          setUsers( users )
      )
  }, [])

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === Number(match.params.id))
    : null

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/:id" element={<Profile user={user}/>} />
    </Routes>
  )
}

  

export default App
