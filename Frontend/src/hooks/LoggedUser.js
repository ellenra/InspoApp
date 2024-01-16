import { useState, useEffect } from 'react'
import pictureService from '../services/pictureservice'

const useLoggedUser = () => {
    const [user, setUser] = useState(null)
  
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        pictureService.setToken(user.token)
      }
    }, [])
    return user
}

export default useLoggedUser