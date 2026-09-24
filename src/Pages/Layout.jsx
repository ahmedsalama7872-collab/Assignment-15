import React from 'react'
import  NavbarCom  from '../components/NavbarCom'
import { Outlet } from 'react-router-dom'
import  SidebarCom  from '../components/SidebarCom'
import Suggested from '../components/Suggested'
import { useState } from 'react'
import { set } from 'react-hook-form'
export default function Layout() {
  const [link, setLink] = useState('https://route-posts.routemisr.com/posts/feed?only=following&limit=40');
  const [bookmarked, setBookmarked] = useState(false);
  return (<div>


<NavbarCom/>

<div className='lg:mx-auto max-w-7xl py-4 grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px] mx-3'>
    
<SidebarCom link={link} setLink={setLink} bookmarked={bookmarked} setBookmarked={setBookmarked}/>
<Outlet context={{ link, setLink ,bookmarked}}/>
<Suggested/>
</div>
  </div>

)
}
