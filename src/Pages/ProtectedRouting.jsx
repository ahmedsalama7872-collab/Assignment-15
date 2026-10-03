import React from 'react'
import Auth from './Auth'

export default function ProtectedRouting({children}) {
    if (localStorage.getItem('userToken')){
    return (
        children
  )}
  else{
return(
    <Auth/>
)
  }
}
