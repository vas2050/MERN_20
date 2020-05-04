//import React, { Component } from 'react';

import {
  faPlus,
  faMinus,
  faPercent,
  faDivide,
  faEquals,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const tableStyle = {
//    backgroundColor: "#777323",
  width: 50,
  marginLeft: "30%",
  marginTop: "2%",
  textAlign: "center",
};

const cellVariants = {
  0: "outline-success",
  1: "light",
  2: "secondary",
  3: "warning"
}

const cellStyle0 = {
  marginLeft: 2,
  marginRight: 2,
  width: "100%",
  height: 50,
  textAlign: "right"
}

const cellStyle1 = {
  marginLeft: 2,
  marginRight: 2,
  width: "100%",
  height: 50,
  textAlign: "left"
}

const cellStyle2 = {
  marginLeft: 2,
  marginRight: 2,
  width: 50,
  height: 50
}

const cellButtons = [
  { id: 0, btns: [
             { id: 0, vid: 0, len: 4, val: -1 }
           ]
  },
  { id: 1, btns: [
             { id: 0, vid: 1, len: 1, type: "operator", val: "AC" },
             { id: 1, vid: 1, len: 1, type: "operator", val: "+/-" },
             { id: 2, vid: 1, len: 1, type: "operator", val: "%" },
             { id: 3, vid: 3, len: 1, type: "operator", val: "/", icon: faDivide }
           ]
  },
  { id: 2, btns: [
             { id: 0, vid: 2, len: 1, val: 7 },
             { id: 1, vid: 2, len: 1, val: 8 },
             { id: 2, vid: 2, len: 1, val: 9 },
             { id: 3, vid: 3, len: 1, type: "operator", val: "*", icon: faTimes }
           ]
  },
  { id: 3, btns: [
             { id: 0, vid: 2, len: 1, val: 6 },
             { id: 1, vid: 2, len: 1, val: 5 },
             { id: 2, vid: 2, len: 1, val: 4 },
             { id: 3, vid: 3, len: 1, type: "operator", val: "-", icon: faMinus }
           ]
  },
  { id: 4, btns: [
             { id: 0, vid: 2, len: 1, val: 1 },
             { id: 1, vid: 2, len: 1, val: 2 },
             { id: 2, vid: 2, len: 1, val: 3 },
             { id: 3, vid: 3, len: 1, type: "operator", val: "+", icon: faPlus }
           ]
  },
  { id: 5, btns: [
             { id: 0, vid: 2, len: 2, val: 0 },
             { id: 1, vid: 2, len: 1, val: "." },
             { id: 2, vid: 3, len: 1, type: "operator", value: "=", icon: faEquals }
           ]
  }
];

export {
  tableStyle,
  cellVariants,
  cellStyle0,
  cellStyle1,
  cellStyle2,
  cellButtons
} 
