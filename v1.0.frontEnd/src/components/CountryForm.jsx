import React, { Component, Fragment } from "react";
import CountryData from "./CountryData";
import "../css/select.css";

class CountryForm extends Component {
  /*
  constructor() {
    super();
    this.state = {
      list: [],
      code: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  */

  state = {
    list: [],
    code: "",
  };

  componentDidMount() {
    fetch("http://localhost:4000/covid/country/show/")
    .then(res => res.json())
    .then(data => {
      const list = data.map(c => {
        return({code: c.code, name: c.name});
      });
      this.setState({list});
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <h4>Choose a country</h4>
        <div className="select" style={{width: "200px"}}>
          <select name="code" value={this.state.code} onChange={this.handleChange} >
            <option value="">--</option>
            {
              this.state.list.map(c => {
                return(
                  <Fragment key={c.code}>
                    <option value={c.code}>{c.name}</option>); 
                  </Fragment>
                );
              })
            }
          </select>
        </div>
        <br/>
        { this.state.code && <CountryData key={this.state.code} code={this.state.code} /> }
      </div>
    );
  }
}

export default CountryForm;
