/*const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.static("public"));
app.use(express.json());

let connection = null;
async function connectDB() {
  try {
    connection = await mysql.createConnection({
      user: "root",
      password: "Tayyaba23523",
      host: "localhost",
      database: "breezy-users",
    });
  } catch (error) {
    console.error("Something went wrong with connecting to db", error);
  }
}
connectDB();

// REST API route

app.get("/users", async function (req, res) {
  const [users] = await connection.query("SELECT * FROM users");
  res.json(users);
});

app.get("/users/:id", async function (req, res) {
  const [users] = await connection.query("SELECT * FROM users");
  res.json(users);
});


app.post("/users", async function (req, res) {
  const newUser = req.body;
  const query = `INSERT INTO users (Name, Age) VALUES ('${newUser.name}', ${newUser.age})`;
  const [result] = await connection.query(query);
  if (result) {
    res
      .status(201)
      .json({ ID: result.insertId, Name: newUser.name, Age: newUser.age });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3500, function () {
  console.log("started listeing on localhost:3500");
});*/

//---the below code is working properly for edit html ------------------------------------------------------------------------------------------------------------


const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.static("public"));
app.use(express.json());

let connection = null;

async function connectDB() {
  try {
    connection = await mysql.createConnection({
      user: "root",
      password: "Tayyaba23523",
      host: "localhost",
      database: "breezy-users",
    });
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Something went wrong with connecting to db", error);
  }
}
connectDB();

// Fetch all users
app.get("/users", async function (req, res) {
  try {
    const [users] = await connection.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a single user by ID
app.get("/users/:id", async function (req, res) {
  const userId = req.params.id;
  try {
    const [users] = await connection.query("SELECT * FROM users WHERE user_id = ?", [userId]);
    if (users.length > 0) {
      res.json(users[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new user
app.post("/users", async function (req, res) {
  const newUser = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO users (username, firstname, lastname, age, email, password, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [newUser.username, newUser.firstname, newUser.lastname, newUser.age, newUser.nickname, newUser.email, newUser.password, newUser.bio]
    );
    res.status(201).json({ ID: result.insertId, Name: newUser.name, Age: newUser.age });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a user by ID
app.put("/users/:id", async function (req, res) {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const [result] = await connection.query(
      "UPDATE users SET ? WHERE user_id = ?",
      [updatedData, userId]
    );
    if (result.affectedRows > 0) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3500, function () {
  console.log("Started listening on localhost:3500");
});







