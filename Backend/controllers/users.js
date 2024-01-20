const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Picture = require('../models/picture')

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

usersRouter.get('/:id/pictures', async (request, response) => {
    try {
        const userId = request.params.id
        const user = await User.findById(userId).populate('pictures')
        if (!user) {
            return response.status(404).json({ error: 'User not found' })
        }
        const pictures = user.pictures.map((pic => ({ 
            id: pic._id.toString(),
            url: pic.url,
            title: pic.title,
            description: pic.description
        })))
        return response.json({ pictures })
    } catch (error) {
        console.log('error in fetching user', error)
        response.status(500).json({ error: 'Internal server error' })
    }
})

usersRouter.post('/:id/likes', async (request, response) => {
    try {
        const userId = request.params.id
        const pictureId = request.body.pictureId
        const user = await User.findById(userId)
        
        if (!user.likedPictures.includes(pictureId)) {
            user.likedPictures.push(pictureId)
            await user.save()
        }
        response.status(200).json({ message: 'Picture liked!' })
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' })
    }
})

usersRouter.get('/:id/likes', async (request, response) => {
    const userId = request.params.id
    try {
        const user = await User.findById(userId).populate('likedPictures', { url: 1, title: 1, description: 1 })
        if (!user) {
          return res.status(404).json({ error: 'User not found' })
        }
        return response.json(user.likedPictures)
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' })
    }
})

usersRouter.delete('/:id/likes', async (request, response) => {
    const userId = request.params.id
    const pictureId = request.body.id
    try {
        const user = await User.findById(userId)
        user.likedPictures.pull(pictureId)

        await user.save()
        const updatedUser = await User.findById(userId)
        const updatedLikes = updatedUser ? updatedUser.likedPictures : []
        return response.json(updatedLikes)
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' })
    }
})


module.exports = usersRouter
