const express = require('express');
const router = express.Router();
const testFunctions = require('../unitExample');

app.get("/hello", function(request, response){
    response.send(testFunctions.sayHello());
})

module.exports = router;