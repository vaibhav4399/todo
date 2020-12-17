const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const workschema = new Schema({
//   list : String
// });

const userschema = new Schema({
  name : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  phone : {
    type : Number,
    required : true
  },
  work : [String]
},{timestamp : true});

var User = mongoose.model("user",userschema);

module.exports = User;
