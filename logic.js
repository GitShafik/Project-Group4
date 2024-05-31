const { connectDB } = require("./database");
const mysql = require('mysql2/promise');
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());

//logics for unit tests
async function getUsers() {
    const conn = await connectDB();
    const [users] = await conn.query("SELECT * FROM users");
    return users;
}

async function getUserById(userId) {
    const conn = await connectDB();
    const [users] = await conn.query("SELECT * FROM users WHERE user_id = ?", [userId]);
    return users[0];
}

async function createUser(newUser) {
    const conn = await connectDB();
    const query =
        "INSERT INTO users (username, firstname, lastname, age, nickname, email, password, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        newUser.username,
        newUser.firstname,
        newUser.lastname,
        newUser.age,
        newUser.nickname,
        newUser.email,
        newUser.password,
        newUser.bio,
    ];
    const [result] = await conn.query(query, values);
    return result.insertId;
}

async function updateUser(userId, updatedData) {
    const conn = await connectDB();
    const [result] = await conn.query("UPDATE users SET ? WHERE user_id = ?", [updatedData, userId]);
    return result.affectedRows > 0;
}

// Delete a user by ID
async function deleteUser(userId) {
    const conn = await connectDB();
    const [result] = await conn.query('DELETE FROM users WHERE user_id = ?', [userId]);
    return result.affectedRows > 0;
}

// Function to check if a user exists
async function userExists(userId) {
    const conn = await connectDB();
    const [result] = await conn.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    return result.length > 0;
}



module.exports = {

    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    userExists,
};

