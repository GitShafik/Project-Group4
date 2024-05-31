const logic = require("../../logic.js");
/*
const app = require(“../../server.js”)
*/
describe("Get all Users", function () {
  it("should get all users from the DB", async function () {
    const users = await logic.getUsersFromDB();
    expect(users.length > 0).toBe(true);
  });
});
//Fetch user by ID
describe("GET /users/:id", () => {
  it("should return the user if found", async () => {
    // Arrange
    const userId = 15;
    const User = {
      user_id: userId,
      username: "testuser",
      firstname: "Test",
      lastname: "User",
      age: 30,
      email: "testuser@example.com",
      bio: "Test bio",
      password: "password123",
      nickname: null,
    };
    // Obtain a database connection
    //const connection = await connectDB();
    // Act
    // Call the fetchUserById function with the actual database connection
    const result = await logic.fetchUserById(userId);
    // Assert
    expect(result).toEqual(User);
  });
});
describe("deleteUserById function", () => {
  it("should delete a user by ID", async () => {
    // Call the function to delete the user by ID
    const result = await logic.deleteUserById(2);
    // Assertions
    expect(result).toBe(true);
  });
});