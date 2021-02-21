const express = require('express')
const routes = require('./routes')
const logger = require('morgan')('dev') // 개발단계의 log 를 찍는다.

const app = express()

app.use(express.json()) // app.use 는 순차적으로 실행된다.
app.use(logger)
app.use(routes) // routes directory 의 router 들을 실행한다.

// general error handler
app.use((err, req, res, next) => {
    const { statusCode, message } = err
    console.error(err)
    res.status(statusCode).json({ message })
}) // middleware 함수들의 인자가 네개일경우 첫번째 인자는 무조건 에러

module.exports = app