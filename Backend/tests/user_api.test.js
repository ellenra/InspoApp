const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const User = require('../models/user')
const Picture = require('../models/picture')
const helper = require('./test_helper')

beforeAll(async () => {
    await User.deleteMany()
    await Picture.deleteMany()
})

describe('User api tests', () => {

    test('Users are returned as json', async () => {
        await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
})


