const jwt = require('jsonwebtoken')
const picturesRouter = require('express').Router()
const Picture = require('../models/picture')
const User = require('../models/user')
const picture = require('../models/picture')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

picturesRouter.get('/', async (request, response) => {
    const pictures = await Picture
    .find({}).populate('user', { name: 1, username: 1})
    response.json(pictures)
})

picturesRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    const picture = new Picture({
        url: body.url,
        title: body.title,
        description: body.description,
        likes: 0,
        user: user._id
    })

    const savedPicture = await picture.save()
    user.pictures = user.pictures.concat(savedPicture._id)
    await user.save()
    response.status(201).json(savedPicture)
})

picturesRouter.get('/:id', async (request, response) => {
    try {
        const pictureId = request.params.id
        const picture = await Picture.findById(pictureId).populate('user')

        if (!picture) {
            return response.status(404).json({ error: 'Picture not found.' })
        }

        return response.json(picture)
    } catch (error) {
        console.log('error in fetching picture', error)
        response.status(500).json({ error: 'Internal server error' })
    }
})

picturesRouter.delete('/:id', async (request, response) => {
    const pictureIdToDelete = request.params.id
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid '})
    }
    await User.updateMany(
        { likedPictures: pictureIdToDelete},
        { $pull: { likedPictures: pictureIdToDelete }}
    )
    await Picture.findByIdAndDelete(pictureIdToDelete)
    response.status(204).end()
})

module.exports = picturesRouter
