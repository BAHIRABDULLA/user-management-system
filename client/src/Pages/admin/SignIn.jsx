import React,{useState} from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const addToForm = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    console.log('form data in  admin side ',formData);
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const res =await axios.post('/server/admin/signin',formData)
        console.log(formData,'form data in sign in admin side')
        if(res.data){
          console.log(res.data,'res.data ..........');
          navigate('/admin/home')
        }
    }
  return (
    <div className='mx-auto max-w-lg bg-zinc-300 p-9 my-9 rounded-md'>
      <h2 className='font-semibold text-center text-4xl'>Sign In </h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
        <input className='p-3 outline-none rounded-lg' onChange={addToForm} id='email' type="text" name='email' placeholder='Email' />
        <input className='p-3 outline-none rounded-lg' onChange={addToForm} id='password' type="text" name='password' placeholder='Password' />
        <button type='submit' className='transition ease-in-out delay-150 p-3 font-semibold rounded-lg bg-red-600 hover:-translate-y-1 hover:scale-110
         hover:bg-red-500 hover:text-white duration-300'>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn