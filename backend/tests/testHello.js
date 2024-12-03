let chai = require("chai");
let functions = require("../hello");
suite("Test sayHello", function() {
    test("Test sayHello", function(){
        let expected = "Hello world!!"; // Arrange.
        let actual = functions.sayHello(); // Act.
        chai.assert.equal(expected, actual); // Assert.
    })
})