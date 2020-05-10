import React, { Component } from 'react';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { buttonLayout } from './CalcButtonLayout';
import { tableStyle, displayStyle, zeroStyle, commonStyle, buttonTheme } from './CalcButtonStyle';

class Main extends Component {
  state = {
    display: null, // string type
  };

  operatorList = []; // sring type
  operandList  = []; // int type
  charListTemp = []; // char type

  resetAll = () => {
    this.putOnTheDisplay(0);   // result is zERO
    this.operatorList = [];    // no operators
    this.operandList = [];     // no operands
    this.charListTemp = [''];  // no bits, initial sign bit
  }

  putOnTheDisplay = (num) => {
    num = this.convertBigNumber(num);
    this.setState({display: num});
  }

  convertBigNumber = (num) => {
    const len = num.toString().length;
    const intLen = num.toString().split(".")[0].length;
    if (len > 15) {
      if (intLen > 12) { // truncate decimal to 2
        num = Number(num).toFixed(2);
      }
      else { // get max decimal possible if integer part is small
        num = num.toString().slice(0,15);
      }
      if (num.length > 15) {
        const intPart = num.toString().slice(0,1); // try in d.ddddd+En format
        const decPart = num.toString().slice(1,6);
        num = [intPart, decPart].join(".") + "e" + (intLen-intPart.length).toString();
      }
    }
    return num;
  }

  doTheMath = (op) => {
    const op1 = this.operandList[0];
    let op2 = this.operandList[1];

    switch(op) {
      case '%':
        op2 = (op2 || 1) * op1 / 100; // default 1%
        break;
      case 'sqrt':
        op2 = (op2 || op1) ** (1/2); // power of 1/2
        break;
      case 'sqr':
        op2 = (op2 || op1) ** 2; // power of 2
        break;
      case 'cbrt':
        op2 = (op2 || op1) ** (1/3); // power of 1/3
        break;
      case 'cube':
        op2 = (op2 || op1) ** 3; // power of 3
        break;
      default:
        return false;
    }

    if (isNaN(op2)) {
      alert("Error");
      this.resetAll();
      return false;
    }

    this.putOnTheDisplay(op2); // display the result
    if (this.operandList[1]) { // replace op2 with new op2 or replace op1 if op2 does not exist
      this.operandList[1] = op2;
    }
    else if (this.operatorList.length) {
      this.operandList[1] = op2;
    }
    else if (this.operandList[0]) {
      this.operandList[0] = op2;
    }
    return true;
  }

  pushOperandTemp = (op) => {
    if (op === "." && this.charListTemp.includes(".")) {
      return false;
    }

    if (this.charListTemp.length >= 15) {
      return false;
    }

    this.charListTemp.push(op);
    this.putOnTheDisplay(this.buildTheOperand());
  }

  buildTheOperand = () => {
    return(this.charListTemp[0] + this.charListTemp.slice(1).join(""));
  }

  printTheButtons = (btn) => {
    if (btn.icon) { // vertical ones
      return(<FontAwesomeIcon icon={btn.icon} style={{color: "white"}} />); 
    }
    else if (btn.group) { // horizontal operators
      return(<span>{btn.value}</span>);
    }
    else { // number keys & the dot
      return(<span style={{fontSize: 24}}><strong>{btn.value}</strong></span>);
    }
  }

  handleButtonPress = (btn) => {
    if (btn.type === "operator") {
      const currentOperator = btn.value;

      // push the current operand, in case user typed in something
      if (this.charListTemp[1]) {
        this.operandList.push(parseFloat(this.state.display));
      }

      // user has been done with typing in number keys
      // clear the temporary list
      this.charListTemp = [''];

      // unary operators should be addressed immediately as we get
      // unary operators should not be saved
      // and also continue with more digits that user wants to put in
      switch(currentOperator) {
        case "AC":
          this.resetAll();
          return true;
        case "sqrt": 
        case "sqr": 
        case "cbrt": 
        case "cube": 
        case "%":
          return this.doTheMath(currentOperator);
        case "+/-":
          this.putOnTheDisplay(-1 * parseFloat(this.state.display));
          if (!this.charListTemp[1] && this.operandList[0]) { // result not operand
            this.operandList[0] *= -1;
          }
          else {
            this.charListTemp[0] = (this.charListTemp[0] === "-") ? "+" : "-";
          }
          return true;
        default:
          break; // continue to binary operation
      }

      // check if binary operators pressed consecutively
      // meaning cancel the previous operation
      // replace the operator and return

      const prevOperator = this.operatorList.shift();
      if (currentOperator !== '=' && this.opAlreadyChecked) {
        this.operatorList.push(currentOperator);
        return false
      }
      this.opAlreadyChecked = true;

      // assuming operand list has always two items for binary operation
      let op1 = this.operandList.shift();
      const op2 = this.operandList.shift();

      switch(prevOperator) {
        case "+":
          op1 += op2;
          break;
        case "-":
          op1 -= op2;
          break;
        case "=":
          op1 = op2 || op1;
          break;
        case "*":
          op1 *= op2;
          break;
        case "/":
          op1 /= op2;
          break;
        default:
          break; // op1, very first time, no operation yet, prevOperator is undefined
      }

      // if binary operators, always do the previous operations
      // current operator a future operation
      this.operatorList.push(currentOperator);
      this.putOnTheDisplay(op1);  // display the result
      this.operandList.push(op1); // the current result (op1) would be a future operand
    }
    else { // number keys
      this.opAlreadyChecked = false;
      const currentOperand = btn.value;
      this.pushOperandTemp(currentOperand);
    }
  }

  componentDidMount() {
    console.log("component did mount");
    this.resetAll();
  }

  render() {
    return (
    <div>
      <Table bordered className="table-dark" style={tableStyle}>
        <tbody>
          <tr>
            <td colSpan="5">
              <Button
                style={displayStyle}
                onClick={() => { alert("Don't do that! you moron!"); }}
                className="rounded-pill"
                variant={buttonTheme[0]} >
                  <h3>{this.state.display}</h3>
              </Button>
            </td>
          </tr>
          {
          buttonLayout.map((line, id) => {
            return(
              <tr key={id}>
                {
                  line.btns.map((btn, id) => {
                    return(
                      <td key={id} colSpan={btn.value === 0 ? "2" : "1"}>
                        <Button
                          onClick={() => {this.handleButtonPress(btn)}}
                          className="rounded-pill"
                          style={btn.value === 0 ? zeroStyle : commonStyle}
                          block={true}
                          variant={buttonTheme[btn.group || 3]} >
                            {this.printTheButtons(btn)}
                        </Button>
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
        </tbody>
      </Table>
      </div>
    );
  }
}

export default Main;
