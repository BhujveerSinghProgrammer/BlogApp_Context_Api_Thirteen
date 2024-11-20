import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';


  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Privateroute from './components/Privateroute';
import Userdashboard from './pages/user-routes/Userdashboard';
import Profileinfo from './pages/user-routes/Profileinfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';

function App() {
  return (
    //  <div className="App">
    //    <h1>This is my HomePage</h1>
    //    <Button color='success' >Click Here</Button>
    // </div>
    <UserProvider>


  <BrowserRouter>
  <ToastContainer position='bottom-center' />

   <Routes>
  <Route path='h' element="<h1>this is home page</h1>" />
   <Route path='/' element={<Home/>} />
  <Route path='home' element={<Home/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/about' element={<About/>} />
  <Route path='/services' element={<Services/>} />
  <Route path='/contactus' element={<ContactUs/>} />
  <Route path='/Post/:Id' element={<PostPage/>} />

{/* // for private route */}
    <Route path='/user' element={<Privateroute/>}>
    <Route path="dashboard" element={<Userdashboard/>}  />
     <Route path="profile" element={<Profileinfo/>}  />
    </Route>


   </Routes>
  </BrowserRouter>
        </UserProvider>
  );
}

export default App;
