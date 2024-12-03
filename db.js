import mongoose from "mongoose";
 import dotenv from "dotenv"
const connectDB=()=>{
    MONGODB_URL="mongodb+srv://shubhanshagrawal0311:shubhansh0311@cluster0.fhq4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    dotenv.config()
    const db=mongoose.connect(MONGODB_URL).then((e)=>{
        console.log("database connected succesfully");
        
    }).catch((err)=>{
        console.log("unable to connect to database",err);
        
    })
}
export default connectDB