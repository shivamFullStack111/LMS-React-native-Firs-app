const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  courses:Array,
  otp:Number,
  image:String,
  isvarified:{
    type:Boolean,
    default:false
  },
  isadmin:{
    type:Boolean,
    default:false
  }

},{timestamps:true})

const Users = mongoose.model('user',userSchema)
module.exports = Users