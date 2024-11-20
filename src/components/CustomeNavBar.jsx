import React, { useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';  //avoid page reload, when we click on 
//Home,Login,Or Signup
import {doLogout} from '../auth/index';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { isLoggedIn } from '../auth';
import {CurrentUser} from '../auth';
function CustomeNavBar() {
  let navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const[login,setLogin]=useState(false);
  const[user,setUser]=useState(undefined);

  useEffect(()=>
  {
    setLogin(isLoggedIn())
    setUser(CurrentUser())
  },[login]
  );

const logout=()=>
{
  doLogout(()=>{
    //logged out next function calling.
    setLogin(false); //we are setting login to false,by using useEffect it(setUser(CurrentUser())) will be called directly.becoz setlogin function changes the value of [login] thatswhy.
   navigate("/");

  })
}

  return (
    <div>
      <Navbar expand={"lg"} color='success' dark fixed='' className='px-4'  >
      <NavbarBrand tag={ReactLink} to="/">Veer Blogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            
              <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>

            
            <NavItem>
              <NavLink tag={ReactLink} to="/About">About</NavLink>
            </NavItem>

  <NavItem>
              <NavLink tag={ReactLink} to="/Services">Services</NavLink>
            </NavItem>

             {/* <NavItem>
              <NavLink href="/About/">About</NavLink>
            </NavItem> */}

            {/* <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
               
                <DropdownItem tag={ReactLink} to="/ContactUs"  >Contact Us</DropdownItem>
                 <DropdownItem href="https://facebook.com"  >Facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="https://youtube.com" >Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
     
          {
     login && ( 
           <>
           
           <Nav className="me-auto" navbar> 
            <NavItem className='px-4'  >
              <NavLink tag={ReactLink} to="/user/profile" >Profile Info </NavLink>
              {/* took this from app.js route */}
            </NavItem>
       <NavItem>
              {/* <NavLink>{user.email}</NavLink> */}
                 <NavLink tag={ReactLink} to="/user/dashboard" >{user.email} </NavLink>
            </NavItem>

              <NavItem className='px-4'  >
              <NavLink onClick={logout} >Logout </NavLink>
            </NavItem>

            </Nav>
      </>
            )
    }
  {
     !login && ( 
           <> <Nav className="me-auto" navbar> 
             <NavItem>
              <NavLink tag={ReactLink} to="/Login">Login</NavLink>
            </NavItem>

                  <NavItem>
              <NavLink tag={ReactLink} to="/Signup">Signup</NavLink>
            </NavItem>
            </Nav>
      </>
            )
    }
        
          <Nav navbar>

          </Nav>
          {/* <NavbarText>Instagram</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomeNavBar;