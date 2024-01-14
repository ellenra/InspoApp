import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    console.error('Error in login:', error.message)
    throw error
  }
}

export default { login }
