/*import User from "../models/user.js";
import bcrypt from "bcrypt";



export function getUsers(req,res){
    User.find().then((data)=>{
        res.json(data)
    })
}

export function saveUsers(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    try{
        const user=new User({
            firstName : req.body.firstName,
            age : req.body.age,
            email : req.body.email,
            password : hashedPassword,
            role : req.body.role,
        })

        user
        .save()
        .then(()=>{
            res.json({
                message : "successfuly add user"
            })
        })
    }
    catch(error){
        res.status(500).json({
            message :"failed to add user",
            error:error.message
        })
    }
}*/

import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
}

export async function saveUsers(req, res) {
  if(req.body.role === "admin"){
    if(req.user !=null){
      if(req.user.role !== "admin"){
        res.status(403).json({
          message:"you are not authorized to create an admin accounts"
        })
        return
      }
    }else{
      res.status(403).json({
        message:"you are not authorized to create an admin account please login first"
      })
      return

    }
  }
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "user",
    });

    await user.save();
    res.status(201).json({ message: "Successfully added user" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add user",
      error: error.message,
    });
  }
}
export function loginUser(req,res){
  const email = req.body.email
  const password =req.body.password
  User.findOne({email:email}).then(
    (user)=>{
      if(user == null){
        res.status(404).json({
          message : "user not found"
        })
      }else{
        const isPasswordCorrect = bcrypt.compareSync(password,user.password)
        if(isPasswordCorrect){
            const token = jwt.sign({
              email : user.email,
              firstName : user.firstName,
              lastName : user.lastName,
              role : user.role,
              img : user.img
            },
          "cbc-batch-fivr@#31")





          res.json({
            message : "Login successfull",
            token :token
          })
        }else{
          res.status(401).json({
            message : "Invalid passwaord"
          })
        }
      }
    }
  )

}
/*export function isAdmin(req){
           if(req.user== null){
              return false
          }
         
        
        if(req.user.role!="admin"){
             return false
          }
          return true
        }
 */
export function isAdmin(req) {
  if (!req.user) return false;
  if (!req.user.role) return false;

  // ✅ Make it case-insensitive
  return req.user.role.toLowerCase() === "admin";
}





