const dotenv=require('dotenv');
dotenv.config();
const captainSignUpSchema=require('../validations/captainSignup.validation');
const captainSigninSchema=require('../validations/captainSignIn.validation');
const vehicleSchema=require('../validations/vehicle.validation');
const Captain=require('../db/models/Captain.model');
const Vehicle=require('../db/models/vehicle.model');
const {captainAuth}=require('../middlewares/auth');
const bcrypt=require('bcrypt');
const  jwt=require('jsonwebtoken');
const BlacklistToken=require('../db/models/BlacklistedToken.model');
const JWT_SECRET=process.env.JWT_SECRET;

const express=require('express');
const { default: mongoose } = require('mongoose');
const  router=express.Router();



// CAPTAIN  SIGN UP ROUTE
router.post('/signup',async(req,res)=>{
    const session= await mongoose.startSession();
    try {
         const {
        firstname,
        lastname,
        email,
        password,
        color,
        plate,
        vehicleType,
        capacity,
    }=req.body;
    const captainParsedData= captainSignUpSchema.safeParse({
        firstname,
        lastname,
        email,
        password
    });
    const vehicleParsedData= vehicleSchema.safeParse({
        color,
        plate,
        vehicleType,
        capacity
    });

    
    if(!captainParsedData.success || !vehicleParsedData.success){
        return res.status(400).json({
            message:"Invalid Input, Plese try again."
        });
    }

    const existingCaptain=await Captain.findOne({email});
    if(existingCaptain){
        return res.status(409).json({
            message:"Captain already exist, Please try login."
        });
    }

    const existingVehicle=await Vehicle.findOne({plate});

    if(existingVehicle){
        return res.status(409).json({
            message:"Vehicle is registed with another captain."
        });
    }

    
    session.startTransaction();
    const hashedPassword=await bcrypt.hash(password,10);

    const newCaptain= await Captain.create([{
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashedPassword,

    }],{session});

    const newVehicle=await  Vehicle.create([{
        captain:newCaptain[0]._id,
        color,
        plate,
        vehicleType,
        capacity
    }],{session});

    await session.commitTransaction();
    session.endSession();

    const token=jwt.sign({id:newCaptain[0]._id},JWT_SECRET);

    return res.status(200).json({
        message:"Captain Sign up Succesful.",
        token
    });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return res.status(500).json({
            message:"Internal  server error."
        })
    }
});

// CAPTAIN  SIGN IN ROUTE
router.post('/signin',async(req,res)=>{

    try {
         const { 
        email,
        password
    }=req.body;

    const captainParsedData= captainSigninSchema.safeParse({
        email,
        password
    });

   
    if(!captainParsedData.success ){
        return res.status(400).json({
            message:"Invalid Input, Plese try again."
        });
    }

    const existingCaptain=await Captain.findOne({email:email});

    if(!existingCaptain){
        return res.status(404).json({
            message:"Captain does not exist, Please try signup."
        });
    }

   

    const correctassword=await bcrypt.compare(password,existingCaptain.password);

   if(!correctassword){
    return res.status(403).json({
        message:"Incorrect Password."
    });
   }


    const token=jwt.sign({id:existingCaptain._id},JWT_SECRET);

    return res.status(200).json({
        message:"Captain Sign in Successful.",
        token
    });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal  server error."
        })
    }
});

// GET USER INFO
router.get("/profile", captainAuth, async (req, res) => {
  try {
    const captain = req.captain;
    const vehicles=await Vehicle.find({captain:captain._id.toString()});
    const filteredVehicles=vehicles.map((vehicle)=>{
        return {
            color:vehicle.color,
            plate:vehicle.plate,
            type:vehicle.vehicleType,
            capacity:vehicle.capacity
        }
    });
    return res.status(200).json({
      firstname: captain.firstname,
      lastname: captain.lastname,
      email: captain.email,
      vehicles:filteredVehicles
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error.",
    });
  }
});

//USER LOGOUT BY BLACKLISTING TOKEN
router.get("/logout", captainAuth, async (req, res) => {
  try {
    const token = req.token;
    await BlacklistToken.create({
      token,
    });
    return res.status(200).json({
      message: "Captain logged out.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


module.exports=router;