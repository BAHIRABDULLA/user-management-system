import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteUserStart, deleteUserSuccess, deleteUsesrFailure, signOut, updateUserStart, updateUserSuccess, updateUsesrFailure } from '../../redux/user/userSlice'


const Profile = () => {
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  console.log(imagePercent, 'imagePercent');
  const [imageError, setImageError] = useState(false)
  const [formData, setFormdata] = useState({})
  console.log(formData, 'form data in profile');
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const { currentUser, loading, error } = useSelector(state => state.user)
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
        // console.log('updated is '+progress+'% done');
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uplaodTask.snapshot.ref).then((downloadURL) =>
          setFormdata({ ...formData, profilePicture: downloadURL }))
      })
  }
  const addToForm = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value })
  }
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await axios.post(`/server/update/${currentUser._id}`, formData)
      if (res.data === false) {
        dispatch(updateUsesrFailure(res.data))
        return
      }
      dispatch(updateUserSuccess(res.data))
      setUpdateSuccess(true)
    } catch (error) {
      console.error('Error founded in handleSubmit in profile', error);
      dispatch(updateUsesrFailure(error))
    }

  }
  console.log(formData, 'form data in add to form ');

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await axios.delete(`/server/delete/${currentUser._id}`)
      if (res.data === false) {
        dispatch(deleteUsesrFailure(res.data))
        return
      }
      dispatch(deleteUserSuccess())
    } catch (error) {
      console.error('Error founding on handleDeleteAccount', error);
      dispatch(deleteUsesrFailure(error))
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
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-3'>Profile</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept='image/.*' onChange={(e) => setImage(e.target.files[0])} />
        <img onClick={() => fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture}
          alt="" className='h-16 outline-green-800 border-red-800-400 w-24 self-center
        cursor-pointer rounded-full object-cover'/>

        <p className='text-sm self-center'>{imageError ? (
          <span className='text-red-700'>Error uploading image</span>)
          : imageError > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading : ${imagePercent} %`}</span>)
            : imagePercent === 100 ? (<span className='text-green-700'>Image upload successfully</span>) : ('')}</p>

        <input type="text" defaultValue={currentUser.name} id='name'
          placeholder='Name' onChange={addToForm} className='bg-slate-100 rounded-lg p-2 ' />

        <input type="email" defaultValue={currentUser.email} id='email'
          placeholder='Email' onChange={addToForm} className='bg-slate-100 rounded-lg p-2 ' />

        <input type="text" defaultValue={currentUser.phone ? phone : ""}
          id='phone' placeholder='Phone' onChange={addToForm} className='bg-slate-100 rounded-lg p-2 ' />

        <input type="password" defaultValue={currentUser.password}
          id='password' placeholder='Password' onChange={addToForm} className='bg-slate-100 rounded-lg p-2 ' />

        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg
         uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'Update'}</button>
      </form>
      <div className='flex justify-between m-5'>
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong'}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && 'User updated'}</p>
    </div>
  )
}

export default Profile