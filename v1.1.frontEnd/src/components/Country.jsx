import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CountryForm from "./CountryForm";
import CountryData from "./CountryData";

class Main extends Component {
  render() {
    return (
      <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">View</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add" className="nav-link">Add</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={CountryForm} />
          <Route path="/add" exact component={CountryData} />
      </Router>
    );
  }
}

export default Main;
