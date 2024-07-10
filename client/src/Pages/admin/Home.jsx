import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Home = () => {
  const [users,setUsers]= useState([])
  const [ search , setSearch] = useState('')
  const navigate = useNavigate()
  const handleEditUser=(id)=>{
    navigate(`/admin/editUser/${id}`)
  }
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
  const handleDeleteAccount = async (id) => {
    try {
      console.log(id,'id id id id ')
      // dispatch(deleteUserStart())
      const res = await axios.delete(`/server/adminDelete/${id}`)
      if (res.data === false) {
        // dispatch(deleteUsesrFailure(res.data))
        return
      }
      // dispatch(deleteUserSuccess())
    } catch (error) {
      console.error('Error founding on handleDeleteAccount', error);
      // dispatch(deleteUsesrFailure(error))
    }
  }
  const handleSignOut = async () => {
    try {
      await axios.get('/server/signout')
      dispatch(signOut())
    } catch (error) {
      console.error('Error founded on handleSing out ', error);
    }
  }
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
                {/* <Link to={`/admin/edituser/${value._id}`}> */}
                <button onClick={()=>handleEditUser(value._id)} className='bg-yellow-400   rounded-lg px-3'>Edit</button>
                {/* </Link> */}
                <button onClick={()=>handleDeleteAccount(value._id)} className='bg-red-600 text-white rounded-lg px-3'>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p onClick={handleSignOut} className='text-blue-700 font-semibold underline'>Sign Out</p>
    </div>
  )
}

export default Home