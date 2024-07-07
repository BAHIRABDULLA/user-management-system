const express =require('express')

const router = express.Router()
router.use(express.json())
// router.use(express.urlencoded({extended:true}))
const authController = require('../controllers/authController.js')
router.post('/signup',authController.signup)
module.exports = router