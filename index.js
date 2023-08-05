// import EXPRESS inside index.js file
const { response } = require('express');

const express = require('express')

// import dataservices
const dataService = require('./services/data.service')

// import cors
const cors =require('cors')

// import jsonwebtoken
const jwt=require('jsonwebtoken')


// create server app using EXPRESS
const app = express()

// to define origin using cors
app.use(cors({
    origin:'http://localhost:4200'
}))

// set up port for server app
app.listen(3000,()=>{
    console.log('server started at 3001');
})

// Application specific middleware
const appMiddleware=(req,res,next)=>{
    // console.log('Application specific middleware');
    next()
}

// to use in entire application
app.use(appMiddleware)

// to parse json
app.use(express.json())

// bank server api - request resolving

// jwt token verification
const jwtMiddleware=(req,res,next)=>{
    console.log('router specific middleware');
    // 1.get token from req header in access-token
    const token = req.headers['access-token']
    // 2.verify token using verify method in jsonwebtoken
    try{
        const data=jwt.verify(token,'secretkey6116')
        req.username=data.username
        next()
    }
    catch{
        res.status(422).json({
            status:false,
            message:'please login'
        })
    }
}

// Login api-resolve

app.post('/login',(req,res)=>{
    console.log(req.body);
    // Asynchronous
    dataService.login(req.body.username,req.body.password)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// register api-resolve

app.post('/register',(req,res)=>{
    console.log(req.body);
    // Asynchronous
    dataService.register(req.body.username,req.body.password,req.body.address)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
app.put('/update',(req,res)=>{
    console.log(req.body);
    // Asynchronous
    dataService.updateUser(req.body.username,req.body.password,req.body.address)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


// delete account API
app.delete('/delete/:username',(req,res)=>{
    dataService.deleteUser(req.params.username)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
