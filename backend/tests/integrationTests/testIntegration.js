let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../integrationExample");
chai.use(chaiHttp);
    suite("Suite routes", function() {
        test("Test GET /hello", function() {
            let app = server.app; // Arrange.
            chai.request(app).get("/hello") // Act.
            .end(function(error, response) {
            chai.assert.equal(response.status, 200); // Assert.
        });
    });
});