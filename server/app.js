// ----- CONSTANTS -----
// JS libraries
const express = require('express')
const mongoose = require('mongoose')
// File Imports
const {MongoURI} = require('./keys') // imports the exported MongoURI from keys.js
require('./models/user') // doesn't require export
// App settings
const app = express()
const PORT = 5000
// idk where this should go
app.use(express.json()) // for parsing json? for post calls only?


// ----- DATABASE CONNECTION -----
mongoose.connect(MongoURI,{
    // old ones depracated, added to adhere to warnings
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// If connection worked
mongoose.connection.on('connected', () => {
    console.log("connected to mongo nice")
})
// If connection failed
mongoose.connection.on('error', (err) => {
    // logs error if failed
    console.log("not connected to mongo\n", err)
})


// ----- MIDDLEWARES -----
// creating middleware
// middleware for modifying incoming request before reaching destination
const customMiddleware = (req, res, next) => {
    console.log("middleware executed")
    // without next, middleware will hang
    // next makes it move on to next command/function
    next()
}
// Example middleware specifically for about page
const aboutMiddleware = (req, res, next) => {
    console.log("Middleware for about page")
    next()
}
// Middleware is used globally (executed right at this line, not for specific route)
app.use(customMiddleware);


// ----- APP ROUTES ----- i.e. route created within app.js, not external file
// Responds (res) to get request with "hello world" when reaching '/'
app.get('/', (req, res) => {
    console.log("home")
    res.send("hello world")
});
// Create route for /about
// by adding 'aboutMiddleware', that middle ware is required before processing GET
app.get('/about', aboutMiddleware, (req, res) => {
    console.log("about page")
    res.send("welcome to about page")
})


// ----- EXT ROUTES ----- i.e. routes created in routes folder
// auth was a non-function export
app.use('/auth', require('./routes/auth')) // imports and uses right away
// example was a function export
const exampleRoute = require('./routes/exampleRoute') // imports without using
app.use('/example', exampleRoute()) // executes function from exampleRoute


// ----- PORT ------
// Open dedicated port to listen to
app.listen(PORT, () => {
    console.log("server is running on ", PORT)
});