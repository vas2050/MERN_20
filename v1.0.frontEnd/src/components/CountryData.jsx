import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Main extends Component {
  /*
  constructor() {
    super();
    this.state = {
      html: []
    };
  }
  */

  state = {
    html: [],
    status: false
  };

  componentDidMount() {
    console.log("componentDidMount() called");
    fetch("http://localhost:4000/covid/data/show/country/" + this.props.code)
    .then(res => res.json())
    .then(data => {
      let html = data.map((row, id) => {
        id++;
        return (
          <React.Fragment key={id}>
            <tr>
              <td>{id}</td>
              <td>{row.code}</td>
              <td>{row.cases}</td>
              <td>{row.deaths}</td>
              <td>{row.okays}</td>
              <td>{row.date}</td>
            </tr>
          </React.Fragment>
        )
      });
      this.setState({html});
      this.setState({status: !this.state.status});
    });
  }

  render() {
    console.log("code: ", this.props.code);
    console.log("status: ", this.state.status);
    return (
      <MDBTable className="table-hover table-dark table-bordered">
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
            <th>Date</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
         {this.state.html}
        </MDBTableBody>
      </MDBTable>
    );
  }
}

export default Main;
