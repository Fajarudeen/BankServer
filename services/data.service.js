// import db
const db = require('./db')

// import jsonwebtoken
const jwt=require('jsonwebtoken')

// login defenition

const login = (username,password)=>{

    // 1.search acno,password in mongodb - findOne()
    return db.User.findOne({
        username,
        password
    }).then((result)=>{
        console.log(result);
        if (result) {
         // generate token
          const token=jwt.sign({username:username},"secretkey6116")

            return{
                message:'Login succesful',
                status:true,
                statusCode:200,
                username:result.username,
                token,
                username
            }
        }
        else{
            return {
                message:'Invalid User Name/Password..!!',
                status:false,
                statusCode:404
            }
        }
    })

}

// register
const register= (username,password,address)=>{

    const filesData = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      size: file.size,
    }));
    // 1.search acno in db , if yes 
    return db.User.findOne({
        username,
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
                username : username,
                password : password,
                address : address,
                files: filesData,
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

const updateUser = (username, newPassword, newAddress) => {

    return db.User.findOne({ username }).then((user) => {
        
      if (!user) {
        return {
          message: 'User not found',
          status: false,
          statusCode: 404,
        };
      }

         // Handle file upload if a file was sent in the request
    let filesData;
    if (req.files && req.files.length > 0) {
      filesData = req.files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        filePath: file.path,
        size: file.size,
      }));
    }
     // Update the product with the new data, including filesData if available
     const updateItems = productSchema.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          ...(filesData && { files: filesData }), // Add filesData to the update only if it exists
        },
        {
          new: true,
        }
      );
  
      if (newPassword) {
        user.password = newPassword;
      }
      if (newAddress) {
        user.address = newAddress;
      }
  
      return user.save().then((updatedUser) => {
        return {
          message: 'User updated successfully',
          status: true,
          statusCode: 200,
          username: updatedUser.username,
          address: updatedUser.address,
        };
      });
    });
  };

// to delete user from db
const deleteUser=(username)=>{
    return db.User.deleteOne({
        username
    })
    .then((result)=>{
        if(result){
            return {
                status:true,
                statusCode:200,
                message:`${username} Deleted Successfully`
            }
        }
        else{
            return {
                message:'Invalid user account ..!!',
                status:false,
                statusCode:404
            }
        }
    }) 
}

module.exports = {
    login,
    register,
    deleteUser,
    updateUser
}



