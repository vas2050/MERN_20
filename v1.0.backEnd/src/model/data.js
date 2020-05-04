const mongoose = require("mongoose");
const DateOnly = require("mongoose-dateonly")(mongoose);
const Schema = mongoose.Schema;

let Data = new Schema({
  code: {
    type: String,
    required: true,
    uppercase: true
  },
  cases: {
    type: Number
  },
  deaths: {
    type: Number
  },
  okays: {
    type: Number
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString()
  }
}, { versionKey: false
});

//Data.index({code: 1, date: 1}, { unique: true });

module.exports = mongoose.model("Data", Data);
