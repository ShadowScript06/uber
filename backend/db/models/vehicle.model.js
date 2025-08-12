const mongoose=require('mongoose');

const vehicleSchema=new mongoose.Schema({
        captain:{
            type:mongoose.Schema.Types.ObjectId, ref:"Captain",
            required:true
        },
        color:{
            type:String,
            required:true,
            minLength:[3,'Color must be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'Plate must be at least 3 characters long '],
            unique:true
        },
        vehicleType:{
            type:String,
            required:true,
            min:[1, 'Capacity must be at least 1']
        },
        capacity:{
            type:Number,
            required:true,
        },
        location:{
            lat:{
                type:Number
            },
            long:{
                type:Number
            }
        }
})

const  Vehicle=new mongoose.model('Vehicle',vehicleSchema);

module.exports=Vehicle;