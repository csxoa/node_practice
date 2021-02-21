const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserService } = require('../services')

const signup = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password ) throw new Error('invalid input')

        const hashedPassword = await bcrypt.hash(password, 8) 

        const createdUser = await UserService.createUser({ email, password: hashedPassword }) 

        res.status(201).json({ createdUsersEmail: createdUser.email })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password: inputPassword } = req.body
        const checkedUser = await UserService.checkUser({ email })
        
        if ( !checkedUser ) {
            const error = new Error('Not found')
            error.statusCode = 404
            throw error
        }

        const { id, password: hashedPassword } = checkedUser

        console.log('2222222222222')

        const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)

        if (!isValidPassword) {
            const error = new Error('Invalid input')
            error.statusCode = 400
            throw error
        }

        const token = jwt.sign({id}, process.env.SECRET_KEY)

        res.status(200).json({ token })
    } catch(err) {
        res.status(err.statusCode).json({ message: err.message})
    }
}

module.exports = {
    signup,
    login
}