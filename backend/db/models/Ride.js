const mongoose =require('mongoose');


const RideSchema=new mongoose.Schema({
    pickup:{
        type:String,
        required:true
    },
    dropoff:{
        type:String,
        required:true
    },
    fare:{
        type:String,
        required:true
    },
    vehicleType:{
        type:String,
        required:true,
         enum: ["bike", "auto", "car"],
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Captain",
        default:null
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        default:"pending",
        enum:["booked","pending","complete","cancelled"]
    },
     createdAt:{
        type:Date,
        default:Date.now,
        expires:3600//24 hrs in sec
    }
});

const Ride=new mongoose.model("Ride",RideSchema);

module.exports=Ride;