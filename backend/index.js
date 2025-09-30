const dotenv=require('dotenv');
dotenv.config();


const express = require('express');
const cors=require('cors')
const connectDb=require('./db/db');
const date=new Date();
const PORT=parseInt(process.env.PORT)||3000;
const userRouter=require('./routes/user.routes');
const captainRouter=require('./routes/captain.route');
const rideRouter=require('./routes/ride.route');

const app=express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/api/v1/user',userRouter);
app.use('/api/v1/captain',captainRouter);
app.use('/api/v1/ride',rideRouter);


app.listen( PORT ,async()=>{
    await connectDb();
    console.log("App is running on "+PORT+" at "+ date.toLocaleString());
});