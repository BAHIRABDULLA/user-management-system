import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Home = () => {
  const [users,setUsers]= useState([])
  const [ search , setSearch] = useState('')
  
  useEffect(() => {
    const fetchUsers = async()=>{
      try {
        const res = await axios.get('/server/admin/users',{
          params:{
            q:search,
          },
        })
        console.log(res.data,'res in home in client side ');
        setUsers(res.data)
      } catch (error) {
        console.error('Error fetching users',error);
      }
    }
    fetchUsers()
  }, [search])
  console.log(users,'users in fetch users ');
  console.log(search,'search in home cliend admin sie');
  return (
    <div className='w-max mx-auto py-6'>
      <h1 className='font-bold text-3xl uppercase text-grey-800 py-6 '>Users List</h1>
      <div className='flex justify-between'>
      <Link to='/admin/adduser'>
      <button className='bg-blue-500 text-white px-3 py-2 rounded-lg'>Add User</button>
      </Link>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} className='px-14 outline-dotted' type="search" placeholder='Search'/>
      </div>
      
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
            <tr key={value._id} className='bg-gray-200 '>
              <td className='py-4 px-6'>{index+1}</td>
              <td className='py-4 px-6'>{value.name}</td>
              <td className='py-4 px-6'>{value.email}</td>
              <td className='py-4 px-6'>{value.phone}</td>
              <td className='py-4 px-6'><img className='h-9 w-9' src={value.profilePicture} alt="" /></td>
              <td className='py-4 px-6 flex flex-col gap-1'>
                <Link to={`/server/admin/edituser/${value._id}`}>
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