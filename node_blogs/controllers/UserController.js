const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserService } = require('../services')
const { errorWrapper, errorGenerator } = require('../errors')

const signup = errorWrapper(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password ) errorGenerator({ message: 'invalid input', statusCode: 400})

    const hashedPassword = await bcrypt.hash(password, 8) 

    const createdUser = await UserService.createUser({ email, password: hashedPassword }) 

    res.status(201).json({ createdUsersEmail: createdUser.email })
})

const login = errorWrapper(async (req, res) => {
     const { email, password: inputPassword } = req.body

    const checkedUser = await UserService.checkUser({ email })
    if ( !checkedUser ) errorGenerator({ message: 'Not found', statusCode: 404 })

    const { id, password: hashedPassword } = checkedUser

    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)
    if (!isValidPassword) errorGenerator ({ message: 'Invalid input', statusCode:400 })

    const token = jwt.sign({id}, process.env.SECRET_KEY)
    res.status(200).json({ token })
})

module.exports = {
    signup,
    login
}