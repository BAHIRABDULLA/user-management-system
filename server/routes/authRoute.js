const express =require('express')

const router = express.Router()
router.use(express.json())
// router.use(express.urlencoded({extended:true}))
const authController = require('../controllers/authController.js')
// router.get('/signup',authController.loadSignup)
router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.post('/google',authController.googleAuth)
module.exports = router