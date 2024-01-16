import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/pictures'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const getById = async (pictureId) => {
    const response = await axios.get(`${baseUrl}/${pictureId}`)
    return response.data
}

const like = async (userId, pictureId) => {
    const response = await axios.post(`${baseUrl}/likePicture/${userId}/${pictureId}`)
    return response.data
}

export default { getAll, create, setToken, getById, like }