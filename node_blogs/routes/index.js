const express = require('express')
const router = express.Router()
const UserRouter = require('./UserRouter')

// use function : (road, func)
router.use('/users', UserRouter)

module.exports = router