let chai = require("chai");
let chaiHttp = require("chai-http");
let {app, server} = require("../../server");
chai.use(chaiHttp);
    suite("Suite routes", function() {
        test("Test GET /hello", function() {
            let serverApp = app; // Arrange.
            chai.request(serverApp).get("/hello") // Act.
            .end(function(error, response) {
            chai.assert.equal(response.status, 200); // Assert.
        });
    });
});