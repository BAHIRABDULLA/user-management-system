const bcrypt = require('bcryptjs')
const Admin = require('../models/adminModel.js')
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, 'email', password, 'password');

        const admin = await Admin.findOne({ email })
        console.log(admin, 'admin .....');
        if (!admin) {
            return res.status(400).json({ mesage: 'credential error' })
        }
        console.log(admin.password, 'admin.password ');
        const hashCheck = bcrypt.compareSync(password, admin.password)
        console.log(hashCheck, 'hashCheck in admin Auth controller ');
        if (!hashCheck) {
            return res.status(400).json({ mesage: 'credential error' })
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        const { password: hashedPassord, ...adminData } = admin._doc
        res.status(200).json({ token, ...adminData })

    } catch (error) {
        console.error('Error founded in admin Sign ihn ', error);
    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        console.log(name, 'name', email, 'email', password, 'password');
        const hashedPassord = bcrypt.hashSync(password, 10)
        console.log(hashedPassord, 'hashed password');
        const userDetails = new User({
            name,
            email,
            phone,
            password: hashedPassord
        })
        const user = userDetails.save()
        console.log(userDetails, 'userDetails ......');
    } catch (error) {
        console.error('Error founded in signup ', error);
    }
}
const editUser = async (req, res) => {
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
        console.error('Error founded in edit User in server side', error);
    }
}
module.exports = {
    signIn,
    addUser,
    editUser
}