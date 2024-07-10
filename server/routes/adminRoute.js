const express = require('express')
const adminRoute = express.Router()


const adminController = require('../controllers/adminController.js')

adminRoute.post('/signin',adminController.signIn)
adminRoute.post('/addUser',adminController.addUser)
adminRoute.post('/editUser/:id',adminController.editUser)
adminRoute.get('/users',adminController.getUsers)

module.exports = adminRoute