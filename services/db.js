// MONGODB connection

// 1.import mongoose
const mongoose=require('mongoose')

// 2.define connection string
mongoose.connect('mongodb://localhost:27017/usermanagement',()=>{
    console.log('Mongodb connected successfully..');
})

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    address: String,
    files: [
        {
          filename: {
            type: String,
            required: [true, "please add the filename"],
          },
          originalName: {
            type: String,
            required: [true, "please add the original filename"],
          },
          filePath: {
            type: String,
            required: [true, "please add the file path"],
          },
          size: {
            type: Number,
            required: [true, "please add the file size"],
          },
        },
      ],
  },
  { timestamps: true }
  );
  module.exports = mongoose.model("User", UserSchema);