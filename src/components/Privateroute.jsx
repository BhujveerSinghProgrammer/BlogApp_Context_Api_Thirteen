  import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth';
  const Privateroute=()=> {
  
// if(isLoggedIn())
// {
//    return <Outlet/>
// }
// else
// {
// return <Navigate to={"/Login"}/>
// }

return isLoggedIn()?<Outlet/> :<Navigate to={"/Login"}/>
  }

  export default Privateroute
