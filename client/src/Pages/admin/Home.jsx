import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Home = () => {
  const [users,setUsers]= useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async()=>{
      try {
        const res = await axios.get('/server/admin/users')
        console.log(res,'res in home in client side ');
        setUsers(res.data)
      } catch (error) {
        console.error('Error fetching users',error);
      }
    }
    fetchUsers()
  }, [])
  console.log(users,'users in fetch users ');
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
          {users.map((value,index)=>(
            <tr key={index} className='bg-gray-200 '>
              <td className='py-4 px-6'>{index}</td>
              <td className='py-4 px-6'>{value.name}</td>
              <td className='py-4 px-6'>{value.email}</td>
              <td className='py-4 px-6'>{value.phone}</td>
              <td className='py-4 px-6'><img className='h-9 w-9' src={value.profilePicture} alt="" /></td>
              <td className='py-4 px-6 flex flex-col gap-1'>
                <Link to={'/admin/edituser'}>
                <button className='bg-yellow-400   rounded-lg px-3'>Edit</button>
                </Link>
                <button className='bg-red-600 text-white rounded-lg px-3'>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home