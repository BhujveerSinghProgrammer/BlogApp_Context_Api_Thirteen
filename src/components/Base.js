import CustomeNavBar from "./CustomeNavBar";
import {Alert} from 'reactstrap';
import '../App';


const Base = ({ title = "welcome to our website", children }) => {
  return (
    <div>
      <CustomeNavBar className="container-fluid p-0 m-0" />
      {children}
   <div className="footer">
    <Alert color="warning"  >
        
    </Alert>
   </div>
 


    </div>
  );
};

export default Base;
