/*import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName :{
        type : String,
        required : true,
    },
    age : Number,
    password :{
        type :String,
        required :true,
    },
    role :{
        type : String,
        required :true,
        default :"customer"
,    },
     isBlocked :{
        type : String,
        required : true,
        default :false,
     },
     img :{
        type :String,
        required :false,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fhd%2F&psig=AOvVaw3KKsnlDxn-j9julLbcHDIU&ust=1760065747029000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICp94GSlpADFQAAAAAdAAAAABAE",
     },
    email :{
       type : String,
       required :true,
       unique : true
    } ,

})

const user = mongoose.model("users",userSchema)
export default user;*/

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
});

const User = mongoose.model("User", userSchema);
export default User;
