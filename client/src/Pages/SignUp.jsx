import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormdata] = useState({})
  const addToForm = (e) => {

    setFormdata({ ...formData, [e.target.id]: e.target.value })
  }
  console.log(formData, 'formdata');
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3004/server/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data, 'data....');

  }

  return (
    <div className='mx-auto max-w-lg p-9 bg-zinc-300 my-9 rounded-md'>
      <h2 className='font-semibold text-center text-4xl'>Sign Up </h2>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-3xl p-4'>
        <div className="relative">
          <input
            className="bg-white rounded-lg p-3 outline-none peer w-full"
            type="text"
            id="name"
            onChange={addToForm}
            name="name"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-3 text-gray-500 pointer-events-none transition-all duration-200 transform origin-top-left scale-100 -translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
          >
            Name
          </label>
        </div>

        {/* <div className='relative'>
          <input className="bg-white rounded-lg p-3 outline-none peer w-full" type="text"
           id="name" onChange={addToForm} name="name" placeholder=" "/>
          <label htmlFor="name" className="absolute left-3 top-3 text-gray-500 pointer-events-none 
          transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
           peer-focus:-translate-y-5 peer-focus:scale-75">Name</label>
          </div> */}
        <div className='relative'>
          <input className='bg-white rounded-lg p-3 outline-none peer w-full' type="text"
            id='email' onChange={addToForm} name='email' placeholder='' />
          <label htmlFor="email" className='absolute left-3 top-3 text-gray-500 pointer-events-none
            transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
            peer-focus:-translate-y-5 peer-focus:scale-75'>Email</label>
        </div>
        <input className='bg-white rounded-lg p-3 outline-none' type="text" id='phone' onChange={addToForm} name='number' placeholder='Phone Number' />
        <input className='bg-white rounded-lg p-3 outline-none' type="password" id='password' onChange={addToForm} name='password' placeholder='Password' />
        {/* <button className='bg-red-600 rounded-lg p-3 hover:bg-red-500 font-semibold  hover:text-white' type='submit'>Sign Up</button> */}
        <button type='submit' className='transition ease-in-out delay-150 p-3 font-semibold rounded-lg bg-red-600 hover:-translate-y-1 hover:scale-110
         hover:bg-red-500 hover:text-white duration-300'>Sign Up</button>
      </form>
      <div>
        <p>Already an account?
          <Link to='/signin'><span className='text-blue-500 font-medium'> Sign In</span></Link></p>
      </div>
    </div>
  )
}

export default SignUp