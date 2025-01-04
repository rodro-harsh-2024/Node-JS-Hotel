const mosgoose = require('mongoose')

// Define person scheme

const personSchema = new mosgoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true               
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },address:{
        type:String
    },
    salary:{
        type : Number,  
        required:true
    } 
});

// Create person model
const Person = mosgoose.model('Person',personSchema);
module.exports = Person;
