const jwt = require('jsonwebtoken')

const initialUsers = [
    {
        username: 'tester',
        email: 'test@gmail.com'
    }
]

const initialPictures = [
    {
        url: 'https://images.unsplash.com/photo-1603950227760-e609ce8e15b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBpbnRlcmVzdCUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D',
        title: 'Reading',
        description: 'Books and coffee',
    },
    {
        url: "https://images.pexels.com/photos/2333855/pexels-photo-2333855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Decoration",
        description: ""
    }
]


module.exports = { initialUsers, initialPictures }