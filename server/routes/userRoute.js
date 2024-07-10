const express  = require('express')
const router = express.Router()


const userController = require('../controllers/userController.js')
const verifyToken = require('../utils/verifyUser.js')


router.get('/',userController.loadPage)
router.post('/update/:id',verifyToken,userController.updateProfile)
router.delete('/delete/:id',verifyToken,userController.deleteUser)
router.delete('/adminDelete/:id',userController.deleteUserByAdmin)
router.get('/signout',userController.signOut)

module.exports= router