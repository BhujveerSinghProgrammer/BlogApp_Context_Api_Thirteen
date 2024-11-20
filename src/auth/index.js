//Notes:-

import { formToJSON } from "axios";
import { json } from "react-router-dom";

//1.isLoggedIn:- if we have token in our local storage it means the user is logged in.
//we have two storages one in session store:-
//1.after closing the browser it removes 
//2.but after closing of browser it retains.

//**************************************************************************************************** */

//There are steps given below to check whether user is login or not:-
//1.isLoggedIn=>
//2.doLogin=>data=>set to local storage
//3.doLogout=>remove from localStorage
//4.get CurrentUser
//*********************************************************************************************************/


//isLoggedIn
export const isLoggedIn=()=>
{
  let data=localStorage.getItem("data");
  if(data!=null) return true;
  else return false;
};

//doLogin
export const doLogin=(data,next)=>
{
localStorage.setItem("data",JSON.stringify(data));
next(); //passing next as callback function,we will execute this function after login to do some task
};


//doLogout
export const doLogout=(next)=>
{
localStorage.removeItem("data");
next();//passing next as callback function,we will execute this function after logout to do some task
}

//get CurrentUser details
export const CurrentUser=()=>
{
  if(isLoggedIn())
  {
    return JSON.parse(localStorage.getItem("data"))?.user; //converting to json object and using safe operator here "?",this question mark is safe operator,if we are getting null in this then it will work fine.
  }
  else
  {
    return undefined;
  }
}

export const getToken=()=>{
 if(isLoggedIn())
  {
    return  JSON.parse(localStorage.getItem("data")).token
  } 
  else
  {
    return null;
  }
}