const z=require('zod');

const  captainSignupSchema=z.object({
    firstname:z.string().min(3),
    lastname:z.string().optional(),
    email:z.email(),
    password:z.string().min(6),
    socketId:z.string().optional(),

});

module.exports=captainSignupSchema;  