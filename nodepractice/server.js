const http = require('http')
const express = require('express')
let { posts } = require('./db') // 서버를 킬 때마다 일시적으로 생성되는 데이터 입니다. 
const app = express()

app.use(express.json())
app.get('/posts', (req, res) => {
    res.json({ posts })
})

// add a post
app.post('/posts', (req, res) => {
    const { username, title, description } = req.body // value 를 꺼내오는 중
    const created = {
        id: posts.length +1, // id 자동 생성
        username,
        title,
        description
    }
    posts = [...posts, created]
    res.status(201).json({ created })
})

// post id 로 조회하는 함수
app.get('/posts/:id', (req, res) => {
    const { id } = req.params // request 로 들어온 id 를 꺼내온다.
    // 위의 id type = string 이므로, Number 함수를 통해 형식을 맞춘다.
    res.status(200).json({ post: posts.find((post) => post.id === Number(id)) })
})

// post id 로 posts 배열중 하나의 post를 업데이트 하는 함수
app.put('/posts/:id', (req, res) => {
    const { id } = req.params
    const { username, title, description } = req.params

    // if (username) errorGenerator(400, 'badrequest')  
    // error handling

    posts = posts.map((post)=> { // index 를 찾기 위해 map 함수를 쓴다.
        if(post.id === Number(id)) {
            modified = {
                ...post,
                username,
                title,
                description
            } 
            return modified // update 된 post return
        }
        return post // 같지 않을때 원문 return
    })
    res.status(200).json({ updated })
 })

 // post id 로 posts 배열중 하나의 post를 삭제하는 함수
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params

    let deleted
    posts = posts.filter((post) => {
        if (post.id !== Number(id)) return true
        // id 가 다르면 배열에 담긴다 = 새로운 post 배열 생성

        deleted = post
        return false // id 가 같으면 배열에서 빠진다.
    })
    res.status(200).json({ deleted })
})

const server = http.createServer(app)

server.listen(8000, () => {
  console.log('server is listening on PORT 3000')
})