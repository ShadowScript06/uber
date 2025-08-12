const dotenv=require('dotenv');
dotenv.config();

const mongoose=require('mongoose');
const DATABASE_URL=process.env.DATABASE_URL;
  const connectDB= async()=>{
    await mongoose.connect(DATABASE_URL);
    console.log("DB is connected");
}

module.exports=connectDB;
