import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase'

const Profile = () => {
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imagePercent,setImagePercent] = useState(0)
  console.log(imagePercent,'imagePercent');
  const [imageError , setImageError] = useState(false)
  const [formData,setFormdata] = useState({})
  console.log(formData,'form data in profile');
  const { currentUser } = useSelector(state => state.user)
  useEffect(()=>{
    if(image){
      handleFileUplaod(image)
    }
  },[image])
  const handleFileUplaod = async(image)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime()+image.name;
    const storageRef = ref(storage,fileName)
    const uplaodTask = uploadBytesResumable(storageRef,image)
    uplaodTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        // console.log('updated is '+progress+'% done');
        setImagePercent(Math.round(progress))
      },
    (error)=>{
      setImageError(true)
    },
    ()=>{
      getDownloadURL(uplaodTask.snapshot.ref).then((downloadURL)=>
        setFormdata({...formData,profilePicture:downloadURL}))
    })
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-3'>Profile</h1>
      <form className='flex flex-col gap-3'>
        <input type="file" ref={fileRef} hidden accept='image/.*' onChange={(e)=>setImage(e.target.files[0])}/>
        <img onClick={() => fileRef.current.click()} src={currentUser.profilePicture}
         alt="" className='h-16 outline-green-800 border-red-800-400 w-24 self-center
        cursor-pointer rounded-full object-cover'/>

        <p className='text-sm self-center'>{imageError?(
          <span className='text-red-700'>Error uploading image</span>)
        :imageError>0 && imagePercent<100?(
          <span className='text-slate-700'>{`Uploading : ${imagePercent} %`}</span>)
        :imagePercent===100?(<span className='text-green-700'>Image upload successfully</span>):('')}</p>

        <input type="text" defaultValue={currentUser.name} id='name'
          placeholder='Name' className='bg-slate-100 rounded-lg p-2 ' />

        <input type="email" defaultValue={currentUser.email} id='email'
          placeholder='Email' className='bg-slate-100 rounded-lg p-2 ' />

        <input type="text" defaultValue={currentUser.phone ? phone : ""}
          id='phone' placeholder='Phone' className='bg-slate-100 rounded-lg p-2 ' />

        <input type="password" defaultValue={currentUser.password}
          id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-2 ' />

        <button className='bg-slate-700 text-white p-3 rounded-lg
         uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between m-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile