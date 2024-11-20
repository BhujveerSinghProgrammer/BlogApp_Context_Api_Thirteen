import { Card, CardBody, CardHeader, Container, Form,FormGroup,Label,Input,Button, Row,Col, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";

import { toast } from "react-toastify";
const Signup=()=>{

  const [data,setData]=useState({name:'',email:'',password:'',about:''})
  const [error,setError]=useState({errors:{},isError:false});
  
const handleChange=(event,property)=>{
  //dynamic setting the values
setData({...data,[property]:event.target.value})
}
//resetting the form
const resetData=()=>{
setData({name:'',email:'',password:'',about:''})
  
}


//submitting the form
const submitForm=(event)=>
{
  event.preventDefault();
  //preventing bydefault behaviour of the form,otherwise page will be submitted and reload
  
  //start :-This code is not working
// if(error.isError)
// {
//   console.log(error);
//    toast.error("form data is invalid!!correct first and then submit");
//    return;
//   }
// //end


  console.log(data);
  //data validation

  //call server api to send the data
signUp(data).then((resp)=>{
  console.log(resp);
  console.log('success log');
  // toast.success("user is registered successfully!!! user id is  "+resp.id);
  toast.success(resp.mgs);
  
  setData({
    name:'',email:'',password:'',about:''
  })
setError({
  errors:{},
  isError:false
})

}).catch((error)=>{
  console.log(error);
  console.log("error log");
  
  //HANDLE ERRORS IN PROPER WAY!!
setError({
  errors:error,
  isError:true
})
// toast.error("user is not registered !!!")
toast.error(error);
})
}

  return (
    <Base>
       <Container>
         <Row className="mt-4">
           <Col sm={{size:6,offset:3}}>
           <Card color="black" inverse>
           <CardHeader>
            <h3 style={{color:"blue"}}>SignUp</h3>
            {/* {JSON.stringify(data)} */}
           </CardHeader>
<CardBody>
  {/* creating form */}
  <Form>
    <FormGroup>
      {/* for name */}
      <Label for="name"  >Enter Name:- </Label>
      <Input type="text" placeholder="Enter Here" id="name" onChange={(e)=>handleChange(e,'name')} value={data.name}
       invalid={error.errors?.response?.data?.Data?.name?true:false}  ></Input>
 <FormFeedback>
  { error.errors?.response?.data?.Data?.name } 
</FormFeedback>


    </FormGroup>



{/* for email */}
<FormGroup>
      <Label for="email">Enter Email:- </Label>
      <Input type="email" placeholder="Enter Here" id="email" onChange={(e)=>handleChange(e,'email')} value={data.email}
      invalid={error.errors?.response?.data?.Data?.email?true:false} 
      ></Input>
      <FormFeedback>
  { error.errors?.response?.data?.Data?.email } 
</FormFeedback>
    </FormGroup>

{/* for password */}
<FormGroup>
      <Label for="password">Enter Password</Label>
      <Input type="password" placeholder="Enter Here" id="password" value={data.password} onChange={(e)=>handleChange(e,'password')}
        invalid={error.errors?.response?.data?.Data?.password?true:false} 
      ></Input>
        <FormFeedback>
  { error.errors?.response?.data?.Data?.password } 
</FormFeedback>

    </FormGroup>


{/* for text area About */}
<FormGroup>
      <Label for="about">About</Label>
      <Input type="textarea" style={{height:"100px"}} value={data.about} placeholder="Enter Here" id="about" onChange={(e)=>handleChange(e,'about')}
       invalid={error.errors?.response?.data?.Data?.about?true:false} 
      ></Input>
       <FormFeedback>
  { error.errors?.response?.data?.Data?.about } 
</FormFeedback>

    </FormGroup>

<Container className="text-center">
  <Button onClick={submitForm} outline color="light" className="me-2" >Register</Button>
   <Button onClick={resetData}  outline color="secondary" type="reset" >Reset</Button>
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

export default Signup;

