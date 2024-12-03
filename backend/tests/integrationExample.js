// Intergration Test example
let express = require("express");
let functions = require("./unitExample");
let app = express();
let port = 9000;

app.get("/hello", function(request, response){
    response.send(functions.sayHello());
})

app.server = app.listen(port, function () {
    console.log("Listening on " + port);
});