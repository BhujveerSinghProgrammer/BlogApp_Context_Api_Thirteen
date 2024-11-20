import { useEffect } from "react";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import { Container } from "reactstrap";

const Home=()=>{


  return (
   <Base>
   <Container className="mt-3">
        <NewFeed/>
   </Container>
   
   </Base>
  )
}

export default Home;