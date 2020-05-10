import React, { Component } from 'react';

const style = {
  color: "maroon",
  fontSize: "4vw",
  fontFamily: "verdana",
  backgroundColor: "white"
};

class Main extends Component {
  /*
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }
  */

  state = {
    data: [],
  };

  render() {
    return(
      <div style={style}>
        <p>Welcome Home!</p>
      </div>
    );
  }
}

export default Main;
