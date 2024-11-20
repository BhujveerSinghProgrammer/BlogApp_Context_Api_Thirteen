import React, { useEffect, useState } from 'react'
import userContext from './userContext'
function UserProvider({children}) {
  const[user,setUser]=useState({
    name:'Bhujveer'
  });

  useEffect(()=>{
    setUser({
      name:'Bhujveer Singh'
    })
  },[]); //it will called on mounting phase only

  return (
   <userContext.Provider value={user}>
    {children}
   </userContext.Provider>
  )
}

export default UserProvider
