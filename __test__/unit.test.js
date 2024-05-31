
const { getUsers, getUserById, createUser, updateUser, deleteUser, userExists } = require('../logic');
const db = require('../database');

describe("Users API Unit Tests with Real Database", () => {
  let connection;

  beforeAll(async () => {
    connection = await db.connectDB;
  });

  afterAll(async () => {
    await connection.end;
  });

  it("should fetch all users", async () => {
    const users = await getUsers();
    expect(users).toBeInstanceOf(Array);
  });


  it("should fetch a user by ID", async () => {
    const user = await getUserById(3); // Assuming user with ID 3 exists
    expect(user).toHaveProperty("user_id", 3);
  });


  it("should give false when user do not exist", async () => {
    const result = await userExists(8888); // Assuming user with ID 8888 not exists
    expect(result).toBe(false)
  });


  it("should update an existing user", async () => {
    const updatedData = { username: "updateduser" };// getting issue here
    const result = await updateUser(3, updatedData); // Assuming user with ID 2 exists
    expect(result).toBe(true);
  });


  it("should return true if user is successfully deleted", async () => {
    const newUser = {
      username: "testuser",
      firstname: "Test",
      lastname: "User",
      age: 30,
      nickname: "tester",
      email: "testuser@example.com",
      password: "password",
      bio: "Bio of test user",
    };
    const userId = await createUser(newUser);
    expect(userId).toBeGreaterThan(0);

    // Attempt to delete the user*/
    const result = await deleteUser(userId);

    // Check if the user was successfully deleted
    expect(result).toBe(true);

  });

});