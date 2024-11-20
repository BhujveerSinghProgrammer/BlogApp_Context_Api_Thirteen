import { useState } from "react";
import Base from "../components/Base";
import { Card, CardBody, CardHeader, Container, Form,FormGroup,Label,Input,Button, Row,Col } from "reactstrap";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login=()=>{

  const navigate=useNavigate();

  const [loginDetails,setLoginDetails]=useState({
    username:'',
    password:''
  })

  const handleReset=()=>{
    setLoginDetails({
    username:'',
    password:''
  })
  }
  
const handleChange=(event,field)=>{
let ActualValue=event.target.value;
  //dynamic setting the values
setLoginDetails({...loginDetails,[field]:ActualValue})
}



const handleFormSubmit=(event)=>{
   event.preventDefault();
   console.log(loginDetails);
   //validations
   if(loginDetails.username.trim()=='' || loginDetails.password=='')
   {
    toast.error("username and password is required!!!")
    return;
   }
  //submit the data to send to the server to get the token
loginUser(loginDetails).then((jwtTokenDatawithUserDetails)=>{

  console.log(jwtTokenDatawithUserDetails);
  console.log('Login Success!!');
  toast.success("Login Success!!")
  //=>this is returning a token and user details like given below:-  
// token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJodWp2ZWVyMzc1QGhvdG1haWwuY29tIiwibmFtZWlkIjoiYmh1anZlZXIzNzVAaG90bWFpbC5jb20iLCJuYmYiOjE3MzAyMTk5NDcsImV4cCI6MTczMDMwNjM0NywiaWF0IjoxNzMwMjE5OTQ3fQ.cMb-_Cx08_tvw0XiYvX1IOFrHjbnub5oCztcJ7FscA4"
// user:
// Id:17
// about:"dndbhhjdhgdhgd"
// email:"bhujveer375@hotmail.com"
// name: "sss"
//Note:-remember this token should be encrypted but now we are using as simple as this.

  setLoginDetails({
      username:'',
    password:''
  })
//saving the data to local storage on browser!
 doLogin(jwtTokenDatawithUserDetails,()=>{
   console.log('login details is saved to local storage!!');
   //redirect to user dashboard page

   navigate("/user/dashboard");
})

}).catch((error)=>{
  console.log(error);
  console.log("error log");
  if(error.response?.status==401||error.response?.status==404) //remember this error means "AxiousError" object
  {
    toast.error(error.response.data.msg);
  }
  else
  {
toast.error("something went wrong on server!!")
  }
})

};

  return (
   
    <Base>
       <Container>
         <Row className="mt-4">
           <Col sm={{size:6,offset:3}}>
           <Card color="black" inverse>
           <CardHeader>
            <h3 style={{color:"green"}}>Login</h3>
           </CardHeader>
<CardBody>
  {/* creating form */}
  <Form onSubmit={handleFormSubmit}>

<FormGroup>
      <Label for="email">Enter Email:- </Label>
      <Input type="email" placeholder="Enter Here" id="email" onChange={(e)=>handleChange(e,'username')}  value={loginDetails.username} ></Input>
    </FormGroup>

{/* for password */}
<FormGroup>
      <Label for="password">Enter Password</Label>
      <Input type="password" placeholder="Enter Here" id="password" onChange={(e)=>handleChange(e,'password')}  value={loginDetails.password}></Input>
    </FormGroup>




<Container className="text-center">
  <Button outline color="light" className="me-2" >Login</Button>
   <Button  outline color="secondary" onClick={handleReset} type="reset" >Reset</Button>
</Container>


  </Form>
</CardBody>
      </Card>
           </Col>
         </Row>
       </Container>




    </Base>
  )
}

export default Login;