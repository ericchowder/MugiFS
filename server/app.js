// Setting constants and requirements
const express = require('express')
const app = express()
const PORT = 5000

// creating middleware
// middleware for modifying incoming request before reaching destination
const customMiddleware = (req, res, next) => {
    console.log("middleware executed")
    // without next, middleware will hang
    // next makes it move on to next command/function
    next()
}

app.use(customMiddleware);

// Responds (res) to get request with "hello world" when reaching '/'
app.get('/', (req, res) => {
    console.log("home")
    res.send("hello world")
});

// Open dedicated port to listen to
app.listen(PORT, () => {
    console.log("server is running on ", PORT)
});