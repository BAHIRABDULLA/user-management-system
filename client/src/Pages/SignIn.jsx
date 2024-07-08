import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
  const [formData, setFormdata] = useState({})
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const addToForm = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value })
  }
  console.log(formData, 'formData in sign in ')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/server/signin', formData)
      console.log(res.data, 'response from server in client side');
      setError('')
      navigate('/')
    } catch (error) {
      console.error('Error founding in handleSubmit signin',error);
      if(error.response&&error.response.status===404){
        setError('Wrong credentials ,please try again ')
      }else{
        setError('An error occured , please try again ')
      }
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
      <div>
        <p>don't have an account?
          <Link to='/signup'>
            <span className='text-blue-500 font-medium'> Sign Up</span></Link>
        </p>
      </div>
      <p className='text-red-700 mt-3'>{error}</p>
    </div>
  )
}

export default SignIn