const functions = require("../../hello");

describe("Test sayHelloFrontend", () => {
  test("Test sayHelloFrontend", () => {
    // Arrange
    const expected = "Hello world!!";
    
    // Act
    const actual = functions.sayHello();
    
    // Assert
    expect(actual).toBe(expected);
  });
});