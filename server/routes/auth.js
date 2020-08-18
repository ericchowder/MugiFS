const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { restart } = require('nodemon')
const User = mongoose.model("User") // Specify "User" from user.js schema


router.get('/', (req, res) => {
    res.send("hello")
})

router.post('/signup', (req, res) => {
    // storing values from post call
    const {name,email,password} = req.body
    // checking if all fields received from req.body
    if (!email || !password || !name){
        // status 422 is service understood req but cannot process
        // returns if failed
        return res.status(422).json({error:"Please fill in all missing fields"})
    }
    /* Originally used to show post request successfully reached back end
    res.json({message:"Successfully posted"})
    console.log(email)
    */
    // find user with body email matching schema email
    User.findOne({email:email})
    // with the returned informaiton (savedUser)
    .then((savedUser) => {
        // if savedUser exists (true), return error
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        const user = new User({
            email, // shorthand for email:email
            password, // shorthand for password:password
            name //shorthand for name:name
        })
        user.save()
        .then(user=>{
            res.json({message:"saved succesfully"})
        })
        // log error if couldn't user.save
        .catch(err=>{
            console.log(err)
        })
    })
    // log error if couldn't User.findOne()
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router