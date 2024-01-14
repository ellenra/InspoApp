const jwt = require('jsonwebtoken')
const picturesRouter = require('express').Router()
const Picture = require('../models/picture')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

picturesRouter.get('/', async (request, response) => {
    const pictures = await Picture
    .find({})
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

module.exports = picturesRouter