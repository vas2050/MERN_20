import {
  faPlus,
  faMinus,
  faDivide,
  faEquals,
  faTimes,
  faSquare,
  faSquareRootAlt,
  faCubes,
  //faUndo,
  faRedo,
  faPercent,
  faSign,
  faCube
} from '@fortawesome/free-solid-svg-icons';

const buttonLayout = [
  {btns: [
           {group: 1, type: "operator", value: "sqrt", icon: faSquareRootAlt},
           {group: 1, type: "operator", value: "AC", icon: faRedo},
           {group: 1, type: "operator", value: "+/-", icon: faSign},
           {group: 1, type: "operator", value: "%", icon: faPercent},
           {group: 2, type: "operator", value: "/", icon: faDivide}
         ]
  },
  {btns: [
           {group: 1, type: "operator", value: "sqr", icon: faSquare},
           {value: 7},
           {value: 8},
           {value: 9},
           {group: 2, type: "operator", value: "*", icon: faTimes}
         ]
  },
  {btns: [
           {group: 1, type: "operator", value: "cube", icon: faCube},
           {value: 4},
           {value: 5},
           {value: 6},
           {group: 2, type: "operator", value: "-", icon: faMinus}
         ]
  },
  {btns: [
           {group: 1, type: "operator", value: "cbrt", icon: faCubes},
           {value: 1},
           {value: 2},
           {value: 3},
           {group: 2, type: "operator", value: "+", icon: faPlus}
         ]
  },
  {btns: [
           {group: 1, type: "operator", value: "placeholder", icon: faCubes},
           {value: 0},
           {value: "."},
           {group: 2, type: "operator", value: "=", icon: faEquals}
         ]
  }
];

export {
  buttonLayout
} 
