const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//  this is adding user to database
const signup = async (req, res) => {
    try {
        console.log('ima a   vettathe');
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

//  check user and sign in to home page
const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, 'email', password, 'password')
        const searchAccount = await User.findOne({ email })

        console.log(searchAccount, 'search account');

        if (!searchAccount) {
            return res.status(404).json({ error: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(password, searchAccount.password)
        console.log(passwordMatch, 'password match');
        if (!passwordMatch) {
            return res.status(404).json({ error: 'Credential invalid' })
        }

        const token = jwt.sign({ id: searchAccount._id }, process.env.JWT_SECRET)
        const { password: hashedPassord, ...rest } = searchAccount._doc
        const expiryDate = new Date(Date.now() + 3600000)// 1 hour
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    } catch (error) {
        console.error('Error founding on signin', error);
    }
}

//  googel authentication works
const googleAuth = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            console.log(user,'user');
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: hashedPassord, ...rest } = user._doc
            const expiryDate = new Date(Date.now() + 3600000)
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassord = bcrypt.hashSync(generatedPassword,10)
            const newUser =  new User({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassord,
                profilePicture:req.body.photo
            })
            console.log(newUser,'new User in auth controller ');
            await newUser.save()
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
            const { password: hashedPassord2, ...rest } = newUser._doc
            const expiryDate = new Date(Date.now() + 3600000)
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
        }

    } catch (error) {
        console.error('Error founded in google Auth server side', error);
    }
}
module.exports = {
    signup,
    signin,
    googleAuth
    // loadSignup
}