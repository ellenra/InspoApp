const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: String,
    pictures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Picture'
        }
    ],
    likedPictures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Picture'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })
  

module.exports = mongoose.model('User', userSchema)