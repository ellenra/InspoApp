const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const User = require('../models/user')
const Picture = require('../models/picture')
const helper = require('./test_helper')

let token
let pictureId
let userId

beforeAll(async () => {
    await User.deleteMany({})
    await Picture.deleteMany({})
    await Picture.insertMany(helper.initialPictures)
    const saltRounds = 10
    helper.initialUsers[0].passwordHash = await bcrypt.hash('salasana', saltRounds)
    let userObject = new User(helper.initialUsers[0])
    await userObject.save()

    const user = {
        username: helper.initialUsers[0].username,
        password: 'salasana'
    }
    const response = await api.post('/api/login').send(user)
    token = response.body.token
    userId = response.body.id
})

describe('Picture api tests', () => {

    test('Pictures are returned as json', async () => {
        await api
            .get('/api/pictures')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('User can upload picture', async () => {
        const pictures = await Picture.find({})

        const newPicture = {
            url: 'https://images.pexels.com/photos/19842326/pexels-photo-19842326/free-photo-of-a-city-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Pretty city',
            description: 'Travel'
        }
        const response = await api
            .post('/api/pictures')
            .set('Authorization', `Bearer ${token}`)
            .send(newPicture)

        pictureId = response.body.id

        expect(response.status).toBe(201)
        
        const picturesNow = await Picture.find({})
        expect(picturesNow.length).toBe(pictures.length + 1)
    })

    test('User can not upload picture without url', async () => {
        const newPicture = {
            url: '',
            title: '',
            description: ''
        }
        const response = await api
            .post('/api/pictures')
            .set('Authorization', `Bearer ${token}`)
            .send(newPicture)

        expect(response.status).toBe(400)        
        expect(response.body.error).toBe('Please provide the URL for the picture')
    })

    test('User can delete own picture', async () => {
        const pictures = await Picture.find({})
        const response = await api
            .delete(`/api/pictures/${pictureId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(204)

        const picturesNow = await Picture.find({})
        expect(picturesNow.length).toBe(pictures.length - 1)
    })

    test('User can like picture to save it to profile', async () => {
        const response = await api
            .post(`/api/users/${userId}/likes`)
            .send({ pictureId: pictureId })
        expect(response.status).toBe(200)
        const user = await User.findById(userId)
        expect(user.likedPictures.map(objId => objId.toString())).toEqual([pictureId]);
    })

    test('User can not like same picture twice', async () => {
        const response = await api
            .post(`/api/users/${userId}/likes`)
            .send({ pictureId: pictureId })
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Picture has already been saved to profile')
    })

    test('User can delete like from picture', async () => {
        const response = await api
            .delete(`/api/users/${userId}/likes`)
            .send({ id: pictureId })
        expect(response.status).toBe(200)

        const user = await User.findById(userId)
        expect(user.likedPictures).toHaveLength(0)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})