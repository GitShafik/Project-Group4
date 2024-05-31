
//const db = require('../database.js');
const request = require("supertest");
const app = require("../app");
const { connectDB } = require("../database");
const userExists = require("../logic");

describe("Users API Integration Tests", () => {
    let connection;

    beforeAll(async () => {
        connection = await connectDB();
    });

    afterAll(async () => {
        await connection.end();
    });


    it("should fetch all users", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should fetch a user by ID", async () => {
        const response = await request(app).get("/users/3"); // Assuming user with ID 3 exists
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user_id", 3);
    });

    it("should return 404 if user is not found", async () => {
        const response = await request(app).get("/users/999999"); // Assuming user with ID 999999 does not exist
        expect(response.status).toBe(404);
    });

    it("should create a new user", async () => {
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
        const response = await request(app).post("/users").send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("user_id");
    });



    it("should update an existing user", async () => {
        const updatedData = { username: "updateduser" };
        const response = await request(app).put("/users/3").send(updatedData); // Assuming user with ID 3 exists
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "User updated successfully");
    });

    it("should return 404 if user is not found", async () => {
        const updatedData = { username: "updateduser" };
        const response = await request(app).put("/users/999999").send(updatedData); // Assuming user with ID 999999 does not exist
        expect(response.status).toBe(404);
    });


    it("should return 404 if the user is already deleted", async () => {
        const userId = 1; // Assuming userId 123 does not exist in the database

        const res = await request(app).delete(`/users/${userId}`);

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "User not found" });
    });
});


