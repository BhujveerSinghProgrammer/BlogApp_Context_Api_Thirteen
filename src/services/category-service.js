import { myAxious } from "./helper";

export const loadAllCategories=()=>{
  return myAxious.get('/api/ReactJsApis/getCategories').then(response=>{return response.data});
}

//done