import axios from "axios";
import { getToken } from "../auth";
export const BASE_URL="http://localhost:53719";

export const myAxious=axios.create({baseURL:BASE_URL,});

//for token we will use privateAxious
export const privateAxious=axios.create({baseURL:BASE_URL,});
privateAxious.interceptors.request.use(config => {
  const token = getToken();
  console.log(token);
  
  if (token) {
    console.log('ram 1');
    console.log({ token });
    
    // Ensure headers object is initialized
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`; // Use backticks for template literals
    
    console.log(config.headers.Authorization);
  }
  
  return config; // Always return the config object
}, error => Promise.reject(error));


