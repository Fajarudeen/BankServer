// import db
const db = require('./db')

// import jsonwebtoken
const jwt=require('jsonwebtoken')

// login defenition

const login = (acno,password)=>{

    // 1.search acno,password in mongodb - findOne()
    return db.User.findOne({
        acno,
        password
    }).then((result)=>{
        console.log(result);
        if (result) {
         // generate token
          const token=jwt.sign({
            currentAcno:acno
        },"secretkey6116")

            return{
                message:'Login succesful',
                status:true,
                statusCode:200,
                username:result.username,
                token,
                currentAcno:acno
            }
        }
        else{
            return {
                message:'Invalid Account number/Password..!!',
                status:false,
                statusCode:404
            }
        }
    })

}

// register
const register= (uname,acno,pswd)=>{
    // 1.search acno in db , if yes 
    return db.User.findOne({
        acno,
    }).then((result)=>{
        // 2. if yes ,response: already exists
        if (result) {
            return {
                message:'Already exists user',
                status:false,
                statusCode:411
            }
        }
        // 3.new user : store all data into db
        else{
            let newUser = new db.User({
                username : uname,
                acno,
                password : pswd,
                balance : 0,
                transaction : []
            }) 
            newUser.save()
            return{
                message:'Register succesful',
                status:true,
                statusCode:200
            }
        }
    })
}

// deposite defenition

const deposite = (req,acno,password,amount)=>{
    var amt=Number(amount)
    // 1.search acno,password in mongodb - findOne()
    return db.User.findOne({
        acno,
        password
    }).then((result)=>{
        if (acno!=req.currentAcno) {
            return {
                message:'Permission denied..!!',
                status:false,
                statusCode:404
            }
        }
        console.log(result);
        if (result) {
            
            result.balance += amt
            result.transaction.push({
                amount,
                type:'CREDIT'
            })
            result.save()
            return{
                message:`${amt} deposited successfully and new balance is ${result.balance}`,
                status:true,
                statusCode:200
            }
        }
        else{
            return {
                message:'Invalid credential..!!',
                status:false,
                statusCode:404
            }
        }
    })

}


// withdraw defenition

const withdraw = (req,acno,password,amount)=>{
    var amt=Number(amount)
    // 1.search acno,password in mongodb - findOne()
    return db.User.findOne({
        acno,
        password
    }).then((result)=>{
        if (acno!=req.currentAcno) {
            return {
                message:'Permission denied..!!',
                status:false,
                statusCode:404
            }
        }
        console.log(result);
        if (result) {
           
            // check sufficient balance
            if (result.balance>amt) {
                result.balance -= amt
                result.transaction.push({
                    amount,
                    type:'DEBIT'
                })
                result.save()
                return{
                    message:`${amt} withdrawal successfully and new balance is ${result.balance}`,
                    status:true,
                    statusCode:200
                }
                
            }
            else{
                return {
                    message:'Insufficient balance..!!',
                    status:false,
                    statusCode:404
                }
            }
        }
        else{
            return {
                message:'Invalid account number or password..!!',
                status:false,
                statusCode:404
            }
        
        }        
    })

}
// transaction function
const transaction = (acno)=>{
    return db.User.findOne({
        acno
    }).then((result)=>{
        if (result) {
            return {
                status:true,
                statusCode:200,
                transaction:result.transaction
            }
        }
        else{
            return {
                message:'Invalid account number ..!!',
                status:false,
                statusCode:404
            }
        }
    })
}

// to delete acno from db
const deleteAcno=(acno)=>{
    return db.User.deleteOne({
        acno
    })
    .then((result)=>{
        if(result){
            return {
                status:true,
                statusCode:200,
                message:`${acno} Deleted Successfully`
            }
        }
        else{
            return {
                message:'Invalid account number ..!!',
                status:false,
                statusCode:404
            }
        }
    }) 
}

module.exports = {
    login,
    register,
    deposite,
    withdraw,
    transaction,
    deleteAcno
}



