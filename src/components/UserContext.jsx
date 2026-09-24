import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from "react";
export const UserContext = createContext();
export default function ContextProvider({children}) {

const [user,setUser]= useState(null)
async function getUser() {
    const {data} = await axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    })
    
    setUser(data.data.user)
}
useEffect(() => {
  getUser();
}, []);
  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>   
  )
}
