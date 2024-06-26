
const express = require("express");
const mysql = require("mysql2/promise");
const app = require('./app');

const PORT = process.env.PORT || 3500;

app.use(express.static("public"));
app.use(express.json());

let connection = null;

async function connectDB() {
  try {
    connection = await mysql.createConnection({
      user: "root",
      password: "Anjum5951!",
      host: "localhost",
      database: "breezy-users",
    });
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error(
      "Something went wrong with connecting to the database",
      error
    );
  }
}

connectDB();

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const [users] = await connection.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a single user by ID
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [users] = await connection.query(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );
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
app.post("/users", async (req, res) => {
  const { username, firstname, lastname, age, email, password, bio } =
    req.body;

  if (!username || !firstname || !lastname || !email) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields." });
  }

  const query =
    "INSERT INTO users (username, firstname, lastname, age, email, password, bio) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    username,
    firstname,
    lastname,
    age,
    email,
    password,
    bio,
  ];

  try {
    const [result] = await connection.query(query, values);
    res
      .status(201)
      .json({ ID: result.insertId, Name: username, Age: age });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
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

const server = app.listen(3500, () => {
  console.log("Server started listening on localhost:3500");
const server = app.listen(PORT, () => {
  console.log(`Server started listening on localhost:${PORT}`);
});

// Gracefully shutdown the server
process.on('SIGINT', async () => {
  console.log('Stopping server...');
  try {
    if (connection) {
      await connection.end(); // Close the database connection
    }
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error occurred during shutdown:', error);
    process.exit(1);
  }
});
})