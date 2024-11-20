import { myAxious, privateAxious } from "./helper";

export const createPost=(postData)=>{
  console.log('the posted data' + postData);
  return privateAxious.post('/api/ReactJsApis/PostContentDetails',postData).then((response)=>response.data);
}
 
//get all posts
//All get posts apis are public so use "myaxios" instead of privateAxious

export const loadAllPosts=()=>{
  return myAxious.get('/api/ReactJsApis/getAllposts').then(response=>response.data); 
}

//get posts by pagenumber and pazesize


export const loadAllPostsByPageNumberandPageSize=(PageNumberInput,PageSizeInput)=>{
  return myAxious.get(`/api/ReactJsApis/getpostsByPageNumberAndPageSize?PageNumberInput=${PageNumberInput}&PageSizeInput=${PageSizeInput}`).then(response=>response.data); 
}

//Note :- if we use parameters given below:-
//  (`/api/ReactJsApis/getpostsByPageNumberAndPageSize?PageNumberInput=${PageNumberInput}&PageSizeInput=${PageSizeInput}`).
//then we will use `` but if we are using simple api then you can also use ''


//
//get posts by Id 

export const loadPostsById=(Id)=>{
  return myAxious.get(`/api/ReactJsApis/getpostById?Id=${Id}`).then(response=>response.data); 
}

//Insert Comments

export const createCommentPost=(postData)=>{
  console.log('the comment posted data' + postData);
  return privateAxious.post('/api/ReactJsApis/PostComments',postData).then((response)=>response.data);
}


////get Comments by Content Id 

export const loadCommentsByContentId=(Id)=>{
  return myAxious.get(`/api/ReactJsApis/getComments?Id=${Id}`).then(response=>response.data); 
}
