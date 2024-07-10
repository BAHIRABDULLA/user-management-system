const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')

const loadPage = async (req, res) => {
    try {
        res.send('dfdfdfd')
    } catch (error) {
        console.error('Error founded in loadpage', error);
    }
}
const updateProfile = async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json('You can update only your account')
    }
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        }, { new: true }
        )
        const { password, ...rest } = updateUser
        res.status(200).json(rest)
    } catch (error) {

    }
}

const deleteUser = async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(404).json('you can delete only your account')
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted...')
    } catch (error) {
        console.error('Error founded in deleteUser ', error);
    }
}
//   this is special funciton , may be delete in future
const deleteUserByAdmin=async(req,res)=>{
   
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted...')
    } catch (error) {
        console.error('Error founded in deleteUser ', error);
    }
}


const signOut = async(req,res)=>{
    try {
        res.clearCookie('access_token').status(200).json('signout success')
    } catch (error) {
        console.error('Error founding on sign out ',error);
    }
}

module.exports = {
    loadPage,
    updateProfile,
    deleteUser,
    deleteUserByAdmin,
    signOut
}