const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { restart } = require('nodemon')
const User = mongoose.model("User") // Specify "User" from user.js schema
const bcrypt = require('bcrypt')

// test route for auth root
router.get('/', (req, res) => {
    res.send("hello")
})

// signup route
router.post('/signup', (req, res) => {
    // storing values from post call
    // Postman test query in raw JSON Body:
    /*
    {
        "name":"myName",
        "email":"myName@email.com",
        "password":"myPassword1234"
    }
    */
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
        // number size (default of 10) determines security of password
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            // create user with provided details
            const user = new User({
                email, // shorthand for email:email
                password:hashedpassword,
                name //shorthand for name:name
            })
            // save created user
            user.save()
            .then(user=>{
                res.json({message:"saved succesfully"})
            })
            // log error if couldn't user.save()
            .catch(err=>{
                console.log(err)
            })
        })
    })
    // log error if couldn't User.findOne()
    .catch(err=>{
        console.log(err)
    })
})

// sign in route
router.post('/signin',(req,res)=>{
    // store received email and password
    const {email,password} = req.body
    // check both email and password are entered
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    // find email within db
    User.findOne({email:email})
    // returned user saved into savedUser
    .then(savedUser=>{
        // if user doesn't exist in db, return error
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        // compared received password with savedUser password
        bcrypt.compare(password,savedUser.password)
        // returns true or false in doMatch
        .then(doMatch=>{
            // respond successful if doMatch is true (password is correct)
            if(doMatch){
                res.json({message:"successfully signed in"})
            }
            // respond error if doMatch is false (password is incorrect)
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

})

module.exports = router