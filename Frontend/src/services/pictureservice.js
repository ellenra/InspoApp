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


const deleteById = async (pictureId) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${pictureId}`, config)
    console.log('made it to services')

    return response.data
}

export default { getAll, create, setToken, getById, deleteById }