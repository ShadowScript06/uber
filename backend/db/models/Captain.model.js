const mongoose=require('mongoose');



const captainSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:[3, "Firstname must be at least 3 characters or long"]
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[6,'Password must be at least 6 characters long ']
    },
    socketId:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    }, 
});

const Captain=new mongoose.model('Captain',captainSchema);

module.exports=Captain;