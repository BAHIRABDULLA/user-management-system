import React from 'react'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Home from './Pages/user/Home'
import SignIn from './Pages/user/SignIn'
import SignUp from './Pages/user/SignUp'
import Profile from './Pages/user/Profile'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import AdminHome from './Pages/admin/Home'
import AdminSignIn from './Pages/admin/SignIn'
import AddUser from './Pages/admin/AddUser'
import EditUser from './Pages/admin/EditUser'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout/>}>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        </Route>

        <Route element={<AdminLayout/>}>
          <Route path='/admin/signin' element={<AdminSignIn/>}/>
          <Route path='/admin/home' element={<AdminHome/>}/>
          <Route path='/admin/adduser' element={<AddUser/>} />
          <Route path='/admin/edituser/:id' element={<EditUser/>} />
        </Route>
      </Routes>
    </Router>
  )
}
const UserLayout = ()=>{
  return(
    <>
      <Header/>
      <Outlet/>
    </>
  )
}
const AdminLayout = ()=>{
  return(
    <>
      <Outlet/>
    </>
  )
}

export default App