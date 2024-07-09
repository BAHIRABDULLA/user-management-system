import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth}  from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

const Oauth = () => {
    const dispatch = useDispatch()
    const handleGoogleClick =async ()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result,'resutl');
            const res = await axios.post('/server/google',{
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            })
            if(res){
                dispatch(signInSuccess(res.data))
            }
        } catch (error) {
            console.error('Error founded in handleGoogleClick',error);
        }
    }
  return (
    <div >
        <button onClick={handleGoogleClick} type='button' className='bg-blue-500 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full'>Continue with goole</button>
    </div>
  )
}

export default Oauth