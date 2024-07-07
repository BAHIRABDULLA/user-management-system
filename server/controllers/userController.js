const loadPage = async (req,res)=>{
    try{
        res.send('dfdfdfd')
    }catch(error){
        console.error('Error founded in loadpage',error);
    }
}
module.exports={
    loadPage
}