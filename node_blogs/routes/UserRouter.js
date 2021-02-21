const express = require('express')
const router = express.Router()

// controllers 에서 user 와 관련된 controller 를 가져온다.
const { UserController } = require('../controllers')

// mapping 시킬 함수들 = signup & login
router.post('/signup', UserController.signup)
router.post('/login', UserController.login)

module.exports = router