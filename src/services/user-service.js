import { myAxious } from "./helper";

export const signUp=(user)=>{
  return myAxious.post('/api/ReactJsApis/registerWithoutPassword',user).then((response)=>response.data);
}

export const loginUser=(loginDetails)=>{
  return myAxious.post('/api/ReactJsApis/Login',loginDetails).then((response)=>response.data);
}
//done