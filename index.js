/*import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app=express()

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://1234:1234@cluster0.ge3u3ef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to the database")
}).catch(()=>{
    console.log("connection is failed")
})

//function successFullyStart(){
//    console.log("server is running on port 3000")
//}
//let number=3000


//app.get("/",

   /* (req,res)=>{
        res.json({autherName : 'Kavindya Sathsarani',
            profilePicture : "https://www.google.com",
            onlien : true,

            feeling : 'Happy',
            caption : "helloworld",
            likes : 100,
            Comments :"hell"
                {name :"Ama",
                    profilePicture : 'https://www.google.com',
                    Comment:'nice pic'
                },
                {
                    name :'Kavi',
                    profilePicture :'https://www.google.com',
                    Comment :'good day'
                }
            ]
        })
        
    }
)
*/

/*app.get("/",
    (req,res)=>{
    console.log(req.body)
})

//student
/*const stuedentSchema = mongoose.Schema({
    Name:String,
    age:Number,
    stream :String,
    email:String
})

const Student=mongoose.model("student",stuedentSchema)

const student= new Student({
    Name : req.body.Name,
    age : req.body.age,
    stream : req.body.stream,
    email : req.body.email
})

student.save().then(()=>{
    res.json({
        message:"student add successfully"
    })
}).catch(()=>{
    res.json({
        message:"failed to add student"
    })
})
*/
/*app.get("/",
    (req,res)=>{
    console.log(req.body.Name)
})*/

//app.delete("/",
   // ()=>{
        //console.log("This is delete reques")
  //  }
//)

//mongodb+srv://<db_username>:1234@cluster0.ge3u3ef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

/*app.listen(5000,()=>{
    console.log("server is running on port 5000");
})*/

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRouter.js';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors())
// Middleware to parse JSON
app.use(bodyParser.json())
/*app.use(
   (req,res,next)=>{
    const tokenString = req.header("Authorization")
    if(tokenString != null){
         const token = tokenString.replace("Bearer ","")
        //console.log(token)
         jwt.verify(token,"cbc-batch-fivr@#31",
          (err,decoded)=>{
            if(decoded != null){
                   console.log(decoded)
            }else{
              console.log("invalid token")
            }
          }
         )
    }
  //console.log(token)
   //next()
   }
  
)
*/

app.use((req, res, next) => {
  const tokenString = req.header("Authorization");
  if (tokenString != null) {
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_KEY,
       (err, decoded) => {
      if (decoded != null) {
       // console.log(decoded);
       req.user = decoded
        next(); // ✅ Continue request if token valid
      } else {
        console.log("invalid token");
        res.status(403).json({ message: "Invalid or expired token" });
      }
    });
  } else {
    next(); // ✅ Allow public routes without token
  }
});



// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Connected to the database");
  })
  .catch(() => {
    console.log("❌ Connection failed");
  });

  
  app.use("/products",productRouter)
  app.use("/users",userRouter)
  app.use("/orders",orderRouter)
// ✅ Create Schema and Model
/*const studentSchema = new mongoose.Schema({
  Name: String,
  age: Number,
  stream: String,
  email: String
});

const Student = mongoose.model("Student", studentSchema);
*/
// ✅ Create POST route to add student
/*app.post("/student", async (req, res) => {
  try {
    const student = new Student({
      Name: req.body.Name,
      age: req.body.age,
      stream: req.body.stream,
      email: req.body.email
    });

    await student.save();

    res.json({
      message: "✅ Student added successfully!"
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to add student",
      error: error.message
    });
  }
});

// ✅ Optional: GET route to view all students
app.get("/students", async (req, res) => {
  Student.find().then((data)=>{
    res.json(data)
  })
})
*/
// ✅ Start the server
app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
});
