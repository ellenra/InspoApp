const User = require('../models/user')
const Picture = require('../models/picture')

const initialUsers = [
    {
        username: 'tester',
        password: 'tester123',
        email: 'test@gmail.com'
    }
]

const initialPictures = [
    {
        url: 'https://images.pexels.com/photos/19842326/pexels-photo-19842326/free-photo-of-a-city-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Pretty city',
        description: 'Travel'
    },
    {
        url: 'https://images.unsplash.com/photo-1603950227760-e609ce8e15b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBpbnRlcmVzdCUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D',
        title: 'Reading',
        description: 'Books and coffee'
    }
]

module.exports = { initialUsers, initialPictures }