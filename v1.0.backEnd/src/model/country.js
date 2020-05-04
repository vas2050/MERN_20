const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Country = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 3,
    uppercase: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: 80,
    minlength: 2
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString()
  }
}, { versionKey: false
});

Country.pre("save", function(next) {
  this.name = this.name.split(/\s+/).map(
    function(n) {
      if (/\./.test(n)) {
        return n.toUpperCase();
      }
      else if (/^(the|of|and)$/.test(n)) {
        return n.toLowerCase();
      }
      else {
        return n[0].toUpperCase() + n.slice(1).toLowerCase()
      }
    }).join(' ');
  next();
});

module.exports = mongoose.model("Country", Country);
