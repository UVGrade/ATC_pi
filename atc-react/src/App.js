import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css"
import Navigation from "./Components/Navigation";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import System from "./pages/System";
import Workers from "./pages/Workers";
import Settings from "./pages/Settings";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "react-bootstrap";



class App extends React.Component {
  render(){
    return(
      <Router className="main-wrapper">
        <div id="body">
          <Navigation>

          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/system" element={<System />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          </Navigation>
          </div>
      </Router>
    )
  }
}
export default App;


