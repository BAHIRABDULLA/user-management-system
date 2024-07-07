import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='mx-auto max-w-lg bg-zinc-300 p-9 my-9 rounded-md'>
      <h2 className='font-semibold text-center text-4xl'>Sign In </h2>
      <form action="" className='flex flex-col gap-4 p-4'>
        <input className='p-3 outline-none rounded-lg' type="text" name='email' placeholder='Email' />
        <input className='p-3 outline-none rounded-lg' type="text" name='password' placeholder='Password' />
        <button className='transition ease-in-out delay-150 p-3 font-semibold rounded-lg bg-red-600 hover:-translate-y-1 hover:scale-110
         hover:bg-red-500 hover:text-white duration-300'>Sign In</button>
      </form>
      <div>
        <p>didn't have an account?
          <Link to='/signup'>
          <span className='text-blue-500 font-medium'> Sign Up</span></Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn