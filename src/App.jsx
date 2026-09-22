import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Pages/Layout'
import Feed from './Pages/Feed'
import Profile from './Pages/Profile'
import Notifications from './Pages/Notifications'
import Settings from './Pages/Settings'

const routes= createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {index:true, element:<Feed/>},
    {path:'/notifications', element:<Notifications/>},
    {path:'/settings', element:<Settings/>}
  ]},
   {path:'/profile', element:<Profile/>},
    {path:'/profile/:id', element:<Profile/>}
])
export default function App() {
  return (

<RouterProvider router={routes}/>


  )
}
