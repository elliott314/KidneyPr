const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Patient = new Schema({
  FullName: {
    type: String
  },
  Email: {
    type: String
  },
  bGroup: {
    type: String
  },
  Address:{
    type:String
  }
},{
    collection: 'patient'
});

module.exports = mongoose.model('Patient', Patient);