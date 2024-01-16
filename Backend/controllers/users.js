const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('pictures', { url: 1, title: 1, description: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        name: body.name,
        username: body.username,
        passwordHash,
        email: body.email
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/:id', async (request, response) => {
    try {
        const userId = request.params.id
        const user = await User.findById(userId).populate('pictures')

        if (!user) {
            return response.status(404).json({ error: 'User not found.' })
        }

        return response.json(user)
    } catch (error) {
        console.log('error in fetching user', error)
        response.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = usersRouter
