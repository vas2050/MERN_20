import React, { Component } from 'react';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cellButtons, tableStyle, cellStyle0, cellStyle1, cellStyle2, cellVariants } from './CalcLayout';

class Main extends Component {
  state = {
    result: 0,
    operator: "",
    operand: "",
    display: 0
  };

  showTheValue = (btn) => {
    if (btn.icon) {
      if (btn.vid === 1) {
        return(<FontAwesomeIcon icon={btn.icon} />); 
      }
      else if (btn.vid === 3) {
        return(<FontAwesomeIcon icon={btn.icon} style={{color: "white"}} />); 
      }
    }
    else if (btn.vid === 1) {
      return(<span>{btn.val}</span>);
    }
    else if (btn.vid === 2) {
      return(<span style={{fontSize: 24}}><strong>{btn.val}</strong></span>);
    }
    else {
      return(<h3>{this.state.display}</h3>);
    }
  }

  getStyle = (btn) => {
    if (btn.len > 1) {
      if (btn.vid === 0) {
        return cellStyle0;
      }
      else {
        return cellStyle1;
      }
    }
    else {
      return cellStyle2;
    }
  }

  onClickHandle = (btn) => {
    let { result, operand, operator } = this.state;

    if (btn.type === "operator") {
      // clear all
      if (btn.val === "AC") {
        this.setState({ result: 0, operand: "", operator: "", display: 0});
        return true;
      }

      let value = btn.val;
      if (operator) {
        if (operand) {
          operand = Number(operand);
          result = Number(result);
          switch(operator) {
            case "+":
              result += operand;
              break;
            case "-":
              result -= operand;
              break;
            case "=":
              value = ""; // reset operator
              result = operand; // start again
              break;
            case "*":
              result *= operand;
              break;
            case "/":
              result /= operand;
              break;
            case "%":
              result *= operand/100;
              break;
            case "+/-":
              if (operand) {
                operand *= -1;
              }
              else if (result) {
                result *= -1;
              }
              break;
            default:
              result = "";
          }
        }
      }
      // save the current operator state
      // clear operand state
      result = result ? result : operand;

      const len = result.toString().length;
      const intLen = result.toString().split(".")[0].length;
      if (len > 15) {
        if (intLen > 12) { // truncate decimal to 2
          result = Number(result).toFixed(2);
        }
        else { // get max decimal possible if integer part is small
          result = result.toString().slice(0,15);
        }
        if (result.length > 15) {
          const intPart = result.toString().slice(0,1); // try in d.ddddd+En format
          const decPart = result.toString().slice(1,6);
          result = [intPart, decPart].join(".") + "e" + (intLen-intPart.length).toString();
          console.log(result);
        }
      }
      this.setState({display: result, operator: value, result, operand: ""});
    }
    // exclude the display button, do for else all
    else if (btn.val !== -1) {
      if (operand.length === 15) {
        return false;
      }
      else if (operand) {
        operand = (/\./.test(operand) && btn.val === ".") ? operand : operand + btn.val.toString(); 
      }
      else {
        operand = btn.val.toString();
      }
      this.setState({display: operand, operand});
    }
    return;
  }

  render() {
    return (
      <Table bordered className="table-dark" style={tableStyle}>
        <thead>
        {
          cellButtons.map(row => {
            return(
              <tr key={row.id}>
                {
                  row.btns.map(btn => {
                    return(
                      <td key={btn.id} colSpan={btn.len}>
                        <Button
                          onClick={() => {this.onClickHandle(btn)}}
                          className="rounded-pill"
                          style={this.getStyle(btn)}
                          block={true}
                          variant={cellVariants[btn.vid]}>
                          {this.showTheValue(btn)}
                        </Button>
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
        </thead>
      </Table>
    );
  }
}

export default Main;
