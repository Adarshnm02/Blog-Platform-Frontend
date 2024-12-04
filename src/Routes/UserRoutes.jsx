import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route >
            <Route path='/signup' element={<SignUp/> }/>
            <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default UserRoutes
