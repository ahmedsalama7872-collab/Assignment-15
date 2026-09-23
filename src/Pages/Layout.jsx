import React from 'react'
import  NavbarCom  from '../components/NavbarCom'
import { Outlet } from 'react-router-dom'
import  SidebarCom  from '../components/SidebarCom'
import Suggested from '../components/Suggested'

export default function Layout() {
  return (<div>


<NavbarCom/>

<div className='mx-auto max-w-7xl py-4 grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]'>
    
<SidebarCom/>
<Outlet/>
<Suggested/>
</div>
  </div>

)
}
