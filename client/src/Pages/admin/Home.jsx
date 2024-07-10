import React from 'react'
import { useNavigate,Link } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='w-max mx-auto py-6'>
      <h1 className='font-bold text-3xl uppercase text-grey-800 py-6 '>Users List</h1>
      <Link to='/admin/adduser'>
      <button className='bg-blue-500 text-white px-3 py-2 rounded-lg'>Add User</button>
      </Link>
      <div className='py-6'>
        <table className='min-w-full py-8'>
          <thead>
            <tr className='bg-gray-800 text-white'>
              <th  className='py-4 px-6'>No</th>
              <th className='py-4 px-6'>Name</th>
              <th className='py-4 px-6'>Email</th>
              <th className='py-4 px-6'>Phone</th>
              <th className='py-4 px-6'>Profile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-gray-200 '>
              <td className='py-4 px-6'>1</td>
              <td className='py-4 px-6'>John Doe</td>
              <td className='py-4 px-6'>WqL9C@example.com</td>
              <td className='py-4 px-6'>5345345</td>
              <td className='py-4 px-6'>WqLgfdgf</td>
              <td className='py-4 px-6 flex flex-col gap-1'>
                <Link to={'/admin/edituser'}>
                <button className='bg-yellow-400   rounded-lg px-3'>Edit</button>
                </Link>
                <button className='bg-red-600 text-white rounded-lg px-3'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home