import React,{ useRef,useState,useEffect } from 'react'
import axios  from 'axios'
import { app } from '../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Link, useNavigate } from 'react-router-dom'

const EditUser = () => {
    const fileRef = useRef(null)
    const [image, setImage] = useState(undefined)
    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const addToForm =(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    useEffect(() => {
        if (image) {
          handleFileUplaod(image)
        }
      }, [image])
      const handleFileUplaod = async (image) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName)
        const uplaodTask = uploadBytesResumable(storageRef, image)
        uplaodTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('updated is '+progress+'% done');
            
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uplaodTask.snapshot.ref).then((downloadURL) =>
              setFormdata({ ...formData, profilePicture: downloadURL }))
          })
      }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const res =await axios.post('/server/admin/adduser',formData)
        console.log(formData,'form data in addUser admin side ')
        if(res.data){
          console.log(res.data,'res.data ..........');
          navigate('/admin/home')
        }
    }
  return (
    <div className='mx-auto max-w-lg p-9 bg-zinc-300 my-7 rounded-md'>
    <h2 className='font-semibold text-center text-4xl'>Edit User</h2>
    <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-3xl p-4'>

    <input type="file" ref={fileRef} hidden accept='image/.*' onChange={(e) => setImage(e.target.files[0])} />
        <img onClick={() => fileRef.current.click()} src={formData.profilePicture}
          alt="" className='h-16 outline-green-800 border-red-800-400 w-24 self-center
        cursor-pointer rounded-full object-cover'/>
      <input className='bg-white rounded-lg p-2 outline-none' type="text" id='name' onChange={addToForm} name='name' placeholder="Name"  />
      <input className='bg-white rounded-lg p-2 outline-none' type="text" id='email' onChange={addToForm} name='email' placeholder="Email" />
      <input className='bg-white rounded-lg p-2 outline-none' type="text" id='phone' onChange={addToForm} name='number' placeholder='Phone Number' />
      <input className='bg-white rounded-lg p-2 outline-none' type="password" id='password' onChange={addToForm} name='password' placeholder='Password' />
      <button className='bg-red-600 rounded-lg p-3 hover:bg-red-500 font-semibold uppercase hover:text-white' type='submit'>Edit user</button>
    </form>
    <Link to='/admin/home'>
   <p  className='text-blue-700 font-semibold'>Back</p>
   </Link>
  </div>
  )
}

export default EditUser