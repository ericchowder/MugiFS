const mongoose = require('mongoose')

// Create a schema for "User" (kind of like template)
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// Called in require('./models/user'), does not require export
// Can be used anywhere since it is not explicitely exported
// module.exports = mongoose.model("User", userSchema)
mongoose.model("User", userSchema)
// Access the User schema via below, example in auth.js:
// const User = mongoose.model("User") 