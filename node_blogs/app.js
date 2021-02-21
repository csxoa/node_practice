const express = require('express')
const routes = require('./routes')
const logger = require('morgan')('dev') // 개발단계의 log 를 찍는다.

const app = express()

app.use(express.json()) // app.use 는 순차적으로 실행된다.
app.use(logger)
app.use(routes) // routes directory 의 router 들을 실행한다.

module.exports = app