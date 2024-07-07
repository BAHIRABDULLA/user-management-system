const express  = require('express')
const router = express.Router()


const userController = require('../controllers/userController.js')

router.get('/',userController.loadPage)

module.exports= router