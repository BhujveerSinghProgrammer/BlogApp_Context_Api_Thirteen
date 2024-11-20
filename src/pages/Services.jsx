import Base from "../components/Base"
import userContext from "../context/userContext";

const Services=()=>{
return(
 
<userContext.Consumer>
  {(user)=>
  (
          <Base>
            <h4 style={{color:"blue"}} >This is our Services Page with Header and Footer</h4>
                <h6 style={{color:"red"}} >Welcome user:{user.name}</h6>
          </Base>
   
  )
 
  }
</userContext.Consumer>



);

};


export default Services;
