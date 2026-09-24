import React, { useState } from 'react'
import NavbarCom from '../components/NavbarCom'
import { Outlet } from 'react-router-dom'
import SidebarCom from '../components/SidebarCom'
import Suggested from '../components/Suggested'

export default function Layout() {
  const [link, setLink] = useState(
    'https://route-posts.routemisr.com/posts/feed?only=following&limit=40'
  )
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div>
      <NavbarCom />

      <div className="lg:mx-auto max-w-7xl py-4 grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px] mx-3">
        <div className="order-1 xl:order-1">
          <SidebarCom
            link={link}
            setLink={setLink}
            bookmarked={bookmarked}
            setBookmarked={setBookmarked}
          />
        </div>

        <div className="order-3 xl:order-2 min-w-0">
          <Outlet context={{ link, setLink, bookmarked }} />
        </div>

        <div className="order-2 xl:order-3">
          <Suggested />
        </div>
      </div>
    </div>
  )
}