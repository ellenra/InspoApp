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

const getUserPictures = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}/pictures`)
    return response.data.pictures
  } catch (error) {
    console.error('Error fetching users pictures:', error.message)
    throw error
  }
}

const likePicture = async (userId, pictureId) => {
  try {
    const response = await axios.post(`${baseUrl}/${userId}/likes`, { pictureId: pictureId })
    return response.data
  } catch (error) {
    throw error
  }
}

const getLikedPictures = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}/likes`)
    return response.data
  } catch (error) {
    console.error('Error fetching users pictures:', error.message)
    throw error
  }
}


export default { register, getAll, getUser, getUserPictures, likePicture, getLikedPictures }