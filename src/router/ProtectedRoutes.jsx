import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  
    const token = localStorage.getItem("accessToken")

    if(token) {
        return <Outlet/>
    } else {
        return <Navigate to='/login' />
    }
  
}

export default ProtectedRoutes