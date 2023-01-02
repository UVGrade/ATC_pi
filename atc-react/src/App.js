import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css"
import Navigation from "./Components/Navigation";
import Home from "./pages/Home";
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
          </Routes>
          </Navigation>
          </div>
      </Router>
    )
  }
}
export default App;


