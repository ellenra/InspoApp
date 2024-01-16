import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const register = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    console.error('Error in register:', error.message)
    throw error
  }
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getUser = async (user) => {
  const request = axios.get(`${baseUrl}/${user.id}`)
  const response = await request
  return response.data 
}

export default { register, getAll, getUser }