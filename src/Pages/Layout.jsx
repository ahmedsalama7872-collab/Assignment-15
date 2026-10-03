import React, { useState } from 'react'
import NavbarCom from '../components/NavbarCom'
import { Outlet } from 'react-router-dom'
import SidebarCom from '../components/SidebarCom'
import Suggested from '../components/Suggested'

export default function Layout() {

const [link, setLink] = useState(
  "https://route-posts.routemisr.com/posts/feed?only=following"
);

const [page, setPage] = useState(1);
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarCom />

      
      <div className="mx-auto max-w-7xl px-3 py-4 grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px] items-start">
        <div className="order-1 xl:order-1 sticky top-[84px]">
          <SidebarCom
          setPage={setPage}
          page={page}
            link={link}
            setLink={setLink}
            bookmarked={bookmarked}
            setBookmarked={setBookmarked}
          />
        </div>

        <div className="order-3 xl:order-2 min-w-0">
         <Outlet
  context={{
    page,
    setPage,
    link,
    setLink,
    bookmarked,
    setBookmarked,
  }}
/>
        </div>

        <div className="order-2 xl:order-3 sticky top-[84px]">
          <Suggested />
        </div>
      </div>
    </div>
  )
}
