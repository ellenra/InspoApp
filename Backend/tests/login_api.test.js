const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')

beforeAll(async () => {
    await User.deleteMany({})
    const saltRounds = 10
    helper.initialUsers[0].passwordHash = await bcrypt.hash('salasana', saltRounds)
    let userObject = new User(helper.initialUsers[0])
    await userObject.save()

})

describe('User api tests', () => {

    test('Users are returned as json', async () => {
        await api.get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('User id is defined', async() => {
        const response = await api.get('/api/users')
        expect(response.body[0].id).toBeDefined()
    })
    
    test('User can log in', async() => {
        const user = {
            username: helper.initialUsers[0].username,
            password: 'salasana'
        }
        const response = await api.post('/api/login').send(user)
        expect(response.status).toBe(200)
        expect(response.body.token).toBeDefined()
    })

    test('User can not log in with invalid credentials', async() => {
        const notRegisteredUser = {
            username: 'user123',
            password: 'abc123'
        }
        const response = await api.post('/api/login').send(notRegisteredUser)
        expect(response.status).toBe(401)
        expect(response.body.error).toBe('Invalid username or password')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})


