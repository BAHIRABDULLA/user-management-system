const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



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
const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email,'email',password,'password')
        const searchAccount = await User.findOne({ email })

        console.log(searchAccount, 'search account');
        
        if (!searchAccount) {
            return res.status(404).json({ error: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(password, searchAccount.password)
        console.log(passwordMatch, 'password match');
        if(!passwordMatch){
            return res.status(404).json({error:'Credential invalid'})
        }

        const token = jwt.sign({ id: searchAccount._id }, process.env.JWT_SECRET)
        const {password:hashedPassord,...rest} = searchAccount._doc
        const expiryDate = new Date(Date.now()+3600000)// 1 hour
        res.cookie('access_token', token, { httpOnly: true ,expires:expiryDate }).status(200).json(rest)
    } catch (error) {
        console.error('Error founding on signin', error);
    }
}

module.exports = {
    signup,
    signin
    // loadSignup
}