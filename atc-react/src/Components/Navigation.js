import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Nav from 'react-bootstrap/Nav';
import { propTypes } from "react-bootstrap/esm/Image";

export default function Navigation(props){
    return (
      <div>
      <Navbar bg="dark" expand={false}>
        <Container>
          <Navbar.Brand href="/">
            <h2>PI ATC</h2>
          </Navbar.Brand>
          <Navbar.Toggle onClick={console.log("test")} />
          
        </Container>
      </Navbar>
      <div className="sidenav">
        <a href="/">Dashboard</a>
        <a href="#">System</a>
        <a href="#">Scheduler</a>
        <a href="#">Settings</a>
      </div>
      
      <div className="mainPage">{props.children}</div>


      </div>
    );
  
}
