const http = require('http')
const express = require('express')
const { hello, sendPosts } = require('./functions')

const app = express()
app.get('/', hello)
app.get('/products', hello, sendPosts)

const server = http.createServer(app)

const PORT = 8000
server.listen(PORT, () => {
    console.log(`${PORT} on!`)
})