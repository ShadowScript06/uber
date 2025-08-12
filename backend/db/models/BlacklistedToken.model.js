const mongoose=require('mongoose');
const { string } = require('zod');

const blacklistedTokenSchema=new mongoose.Schema({
    token:{
        type:string,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400//24 hrs in sec
    }
})

module.exports=mongoose.model('BlacklistToken',blacklistedTokenSchema);