// MONGODB connection

// 1.import mongoose
const mongoose=require('mongoose')

// 2.define connection strring
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('Mongodb connected successfully..');
})

// 3.createv a model to store data of bank
const User = mongoose.model('User',{  
    username : String,
    acno : Number,
    password : String,
    balance : Number,
    transaction : []
})

// 4. to use user in other files - we have to export it
module.exports ={
    User
}