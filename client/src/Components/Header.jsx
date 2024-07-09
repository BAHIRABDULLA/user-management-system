import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const {currentUser} = useSelector(state=>state.user)
    return (
        <div className='bg-zinc-300'>
            <div className='flex justify-between p-7'>
                <h1 className='font-bold text-red-800 max-w-6xl items-center'>User Management System</h1>
                <ul className='flex gap-4'>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/signin'>
                    {currentUser?(<img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full'/>):(<li>Sign In</li>)}</Link>
                    <Link to='/profile'><li>Profile</li></Link>
                    
                    
                    
                </ul>
            </div>
        </div>
    )
}

export default Header