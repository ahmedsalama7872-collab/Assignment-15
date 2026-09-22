import React from 'react'
import NavbarCom from '../components/NavbarCom'
import { Outlet } from 'react-router-dom'

export default function Layout2() {
  return (
    <div>
        <NavbarCom/>
        <Outlet/>
    </div>
  )
}
