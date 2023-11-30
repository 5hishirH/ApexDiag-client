import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer'

const MainLayout = () => {
  return (
    <div className='relative min-h-screen'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <div className='h-32'></div>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout