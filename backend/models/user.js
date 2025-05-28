const mongoose=require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
  name:{
    type:String, 
    required:true
  } ,// String is shorthand for {type: String}
  mobile_no:{
    type:Number,
    required:true
  }, 
  email:{
    type:String,
    required:true
  },
 password:{
    type:String,
    required:true
    },
 
},{
  timestamps: true
});
// This creates a 'User' collection in the database
module.exports = mongoose.model('User', user);