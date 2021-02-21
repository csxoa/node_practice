const dotenv = require('dotenv')
dotenv.config()
const { PORT } = process.env

const prisma = require('./prisma')
const http = require('http')
const app = require('./app') // app.js 에서 app 들을 가져온다.

const server = http.createServer(app)
const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

start()