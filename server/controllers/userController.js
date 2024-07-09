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
        },{new:true}
        )
        const {password,...rest} = updateUser
        res.status(200).json(rest)
    } catch (error) {

    }
}
module.exports = {
    loadPage,
    updateProfile
}