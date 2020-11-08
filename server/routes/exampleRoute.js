const express = require('express')
const router = express.Router()

module.exports = () => {

    const posts = [
        { id: 1, name: 'Pos 1'},
        { id: 2, name: 'Pos 2'},
        { id: 3, name: 'Pos 3'},
        { id: 4, name: 'Pos 4'},
        { id: 5, name: 'Pos 5'},
        { id: 6, name: 'Pos 6'},
        { id: 7, name: 'Pos 7'},
        { id: 8, name: 'Pos 8'},
        { id: 9, name: 'Pos 9'},
        { id: 10, name: 'Pos 10'},
        { id: 11, name: 'Pos 11'},
        { id: 12, name: 'Pos 12'}
    ]

    // test route
    router.get('/', (req, res) => {
        res.send("exampleRoute page")
    })
    /*
    // route for testing paginating
    router.get('/paginate', (req, res) => {
        // url should be "/example?page=1&limit=5"
        // page value received from GET query for page # desired
        const page = parseInt(req.query.page)
        // amount value received from GET query for number of contracts to be listed
        const amount = parseInt(req.query.amount)
        // calculating start and end index for displaying contracts
        const startIndex = (page - 1) * amount
        const endIndex = page * amount
        // object to store next and previous along with array
        const results = {}
        // object property "next" for next page
        // if (endIndex < posts.length) here
        results.next = {
            page: page + 1,
            amount: amount
        }
        // object property "prev" for prev page
        // if (startIndex > 0) here
        results.prev = {
            page: page - 1,
            amount: amount
        }
        // check for page limits
        if(results.prev.page == 0){
            results.prev.page = 1
        }
        // paginating
        results.myPosts = posts.slice(startIndex, endIndex)
        // api response
        res.status(200).send({returnData: results})
    })
    */
   // route for testing paginating
    router.get('/paginate', paginatedResults(posts), (req, res) => {
        res.status(200).send({returnData: res.paginatedResults})
    })
    return router
}

// pagination as a middleware
function paginatedResults(model) {
    return (req, res, next) => {
        // url should be "/example?page=1&limit=5"
        // page value received from GET query for page # desired
        const page = parseInt(req.query.page)
        // amount value received from GET query for number of contracts to be listed
        const amount = parseInt(req.query.amount)
        // calculating start and end index for displaying contracts
        const startIndex = (page - 1) * amount
        const endIndex = page * amount
        // object to store next and previous along with array
        const results = {}
        // object property "next" for next page
        // if (endIndex < model.length) here
        results.next = {
            page: page + 1,
            amount: amount
        }
        // object property "prev" for prev page
        // if (startIndex > 0) here
        results.prev = {
            page: page - 1,
            amount: amount
        }
        // check for page limits
        if(results.prev.page == 0){
            results.prev.page = 1
        }
        // paginating
        results.myModel = model.slice(startIndex, endIndex)
        res.paginatedResults = results
        next()
    }
}