const http = require('http')
const { hello, sendPosts } = require('./functions') 

const server = http.createServer((req, res) => { 
    const { url, method } = req
    console.log( url, method )
    console.log('서버 작동')

    res.setHeader('Content-Type', 'application/json') 
    
    if (url === '/users/signup' && method === 'POST') {
        userSignup()
        return;
    }
    if (url === '/users/login' && method === 'POST') {
        userLogin()
        return;
    }
    if (url === '/products' && method === 'GET') {
        sendPosts(res)
        return;
    }
    
    res.end(JSON.stringify({message : 'SUCCESS'}))
}) 

const PORT = 8000
server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})