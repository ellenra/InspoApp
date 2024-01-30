const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')


describe('Registration api tests', () => {

    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('Registration returns json', async () => {
        const newUser = {
            username: 'tester',
            password: 'goodpassword',
            email: 'a@gmail.com'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(201)
        expect(response.headers['content-type']).toMatch(/application\/json/)
    })

    test('Registration succeeds with valid data', async () => {
        const newUser = {
            username: 'eedit_a',
            password: 'goodpassword',
            email: 'eedit@gmail.com'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(201)
    })

    test('Registration fails with too short password', async () => {
        const newUser = {
            username: 'newuser',
            password: 'abc',
            email: 'newuser@gmail.com'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Password must be at least 6 characters')
    })

    test('Registration fails with invalid email', async () => {
        const newUser = {
            username: 'newuser',
            password: 'goodpassword',
            email: 'email'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Please use a valid email address')
    })

    test('Registration fails with username that already exists', async () => {
        const newUserOne = {
            username: 'newuser',
            password: 'goodpassword',
            email: 'newuser@gmail.com'
        }
        await api.post('/api/users').send(newUserOne)

        const newUserTwo = {
            username: 'newuser',
            password: 'goodpassword',
            email: 'newuser@gmail.com'
        }
        const response = await api.post('/api/users').send(newUserTwo)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Username already in use')
    })

    test('Registration fails if required field missing', async () => {
        const firstNewUser = {
            username: '',
            password: 'goodpassword',
            email: 'newuser@gmail.com'
        }
        const firstResponse = await api.post('/api/users').send(firstNewUser)
        expect(firstResponse.status).toBe(400)
        expect(firstResponse.body.error).toBe('Please fill in all the fields to register!')

        const secondNewUser = {
            username: 'newuser',
            password: 'goodpassword',
            email: ''
        }
        const secondResponse = await api.post('/api/users').send(secondNewUser)
        expect(secondResponse.status).toBe(400)
        expect(secondResponse.body.error).toBe('Please fill in all the fields to register!')

        const thirdNewUser = {
            username: 'newuser',
            password: '',
            email: 'newuser@gmail.com'
        }
        const thirdResponse = await api.post('/api/users').send(thirdNewUser)
        expect(thirdResponse.status).toBe(400)
        expect(thirdResponse.body.error).toBe('Please fill in all the fields to register!')
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})