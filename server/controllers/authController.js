const bcrypt = require('bcryptjs')

const signup = async (req,res)=>{
    try {
        const {name,email,phone,password}  = req.body
        console.log(name,'name',email,'email',password,'password');
        const hashedPassord  = bcrypt.hashSync(password,10)
        console.log(hashedPassord,'hashed password');
        const userDetails = {
            name,
            email,
            phone,
            password:hashedPassord
        }
        await userDetails.save()
    } catch (error) {
        console.error('Error founded in signup ');
    }
}

module.exports = {
    signup
}