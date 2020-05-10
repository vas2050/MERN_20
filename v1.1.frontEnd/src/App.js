import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Calc from "./components/Calc";
import Country from "./components/Country";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-header">
              <span className="navbar-brand">Web Tools</span>
            </div>
            <br />
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/calc" className="nav-link">Calc</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/covid" className="nav-link">Covid-20</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={Home} />
          <Route path="/calc" exact component={Calc} />
          <Route path="/covid" component={() => <Country /> }/>
        </div>
      </Router>
    );
  }
}

export default App;
