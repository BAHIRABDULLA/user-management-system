const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
// const loadSignup=  async (req,res)=>{
//     try {
//         console.log('neee ok alale monu n');
//     } catch (error) {
//         console.error('Error founding on load sign up ')
//     }
// }

const signup = async (req,res)=>{
    try {
        console.log('ima a   vettathe');
        const {name,email,phone,password}  = req.body
        console.log(name,'name',email,'email',password,'password');
        const hashedPassord  = bcrypt.hashSync(password,10)
        console.log(hashedPassord,'hashed password');
        const userDetails = new User({
            name,
            email,
            phone,
            password:hashedPassord
        })
        const user= userDetails.save()
        console.log(userDetails,'userDetails ......');
        const b = await user.save()
        console.log(b,'bbbbbb')
    } catch (error) {
        console.error('Error founded in signup ',error);
    }
}

module.exports = {
    signup,
    // loadSignup
}