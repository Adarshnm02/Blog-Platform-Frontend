import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import SignUp from '../pages/SignUp'


const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route >
            <Route path='/signup' element={<SignUp/> }/>
        </Route>
      </Routes>
    </div>
  )
}

export default UserRoutes
