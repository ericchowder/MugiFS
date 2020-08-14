const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("hello")
})

router.post('/signup', (req, res) => {
    // storing values from post call
    const {name,email,password} = req.body
    // checking if all fields received from req.body
    if (!email || !password || !name){
        // status 422 is service understood req but cannot process
        return res.status(422).json({error:"Please fill in all missing fields"})
    }
    res.json({message:"Successfully posted"})
    console.log(email)
})

module.exports = router