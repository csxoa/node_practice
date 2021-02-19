const http = require('http')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const express = require('express')
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
dotenv.config()

const prisma = new PrismaClient() 
const app = express() 
const server = http.createServer(app)

app.use(express.json())

app.post('/users/signup', async (req, res) => {
    try{
        const { email, password } = req.body

        if (!email || !password ) throw new Error('invalid input')

        const hashedPassword = await bcrypt.hash(password, 8) 
        const createdUser = await prisma.users.create({
            data:{
                email,
                password: hashedPassword
            },
        })
        res.status(201).json({ createdUsersEmail: createdUser.email })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

app.post('/users/login', async (req, res) => {
    try{
        const { email, password: inputPassword } = req.body
        const checkUser = await prisma.users.findUnique({ where: { email }})
        
        if ( !checkUser ) {
            const error = new Error('Not found')
            error.statusCode = 404
            throw error
        }

        const { id, password: hashedPassword } = checkUser
        
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
})

const start = async () => {
    try {
        server.listen(8000, () => console.log('Server is listening'))
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

start()