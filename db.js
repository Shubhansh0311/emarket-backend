import mongoose from "mongoose";
 import dotenv from "dotenv"
 dotenv.config()
const connectDB= async()=>{
  const  MONGODB_URL='mongodb+srv://shubhansh:shubhansh@cluster0.ia7xyfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    const db= await mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((e)=>{
        console.log("database connected succesfully");
        
    }).catch((err)=>{
        console.log("unable to connect to database",err);
        
    })
}
connectDB()
export default connectDB