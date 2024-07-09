import React from 'react'
import { BrowserRouter as Router , Route,Routes } from 'react-router-dom'
import Home from './Pages/user/Home'
import SignIn from './Pages/user/SignIn'
import SignUp from './Pages/user/SignUp'
import Profile from './Pages/user/Profile'
import Header from './Components/Header'


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App