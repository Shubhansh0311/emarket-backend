import mongoose from "mongoose";
 import dotenv from "dotenv"
const connectDB=()=>{
    dotenv.config()
    const db=mongoose.connect(process.env.MONGODB_URL).then((e)=>{
        console.log("database connected succesfully");
        
    }).catch((err)=>{
        console.log("unable to connect to database",err);
        
    })
}
export default connectDB