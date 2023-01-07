import React, { useEffect, useState }  from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import hmb from "../Content/hamburger.png";

import { useLocation } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav';
import { propTypes } from "react-bootstrap/esm/Image";

export default function Navigation(props){

  const [title,setTitle] = useState('Dashboard');

  const location = useLocation();
  useEffect(() => {
    if(location.pathname=='/system'){
      setTitle('System')
    }else if(location.pathname=='/workers'){
      setTitle('Workers')
    }else if(location.pathname=='/docs'){
      setTitle('Docs')
    }else if(location.pathname=='/settings'){
      setTitle('Settings')
    }
  }, [location]);
  console.log(location.pathname);
    return (
      <div>
      <div className="topnav">
        <div className="topLeft">
          <h3>Pi_ATC <img src={hmb} height="40px" alt="UVGrade" /></h3>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="sidenav">
        <a href="/">Dashboard</a>
        <a href="/system">System</a>
        <a href="/workers">Workers</a>
        <a href="/docs">Docs</a>
        <a href="/settings">Settings</a>
      </div>
      
      <div className="mainPage">{props.children}</div>


      </div>
    );
  
}
