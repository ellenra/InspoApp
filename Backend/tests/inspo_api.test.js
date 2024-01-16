const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Picture = require('../models/picture')

const initialUsers = [{
    username: 'tester',
    name: 'tester1'
}]

const initialTestUsers = async() => {
    const saltRounds = 10
    initialUsers[0].passwordHash = await bcrypt.hash('')
}

describe('testi', () => {
    test('when', () => {

    })
})

