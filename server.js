<<<<<<< HEAD
=======
/*const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

// Static file serving middleware
app.use(express.static("public"));
// Parse JSON bodies middleware
app.use(express.json());

let connection = null;

async function connectDB() {
  try {
    // Establish connection to the MySQL database
    connection = await mysql.createConnection({
      user: "root",
      password: "Tayyaba23523",
      host: "localhost",
      database: "breezy-users",
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Something went wrong with connecting to the database", error);
  }
}

// Function to connect to the database
connectDB();

// Define REST API routes
// Get all users route
app.get("/users", async (req, res) => {
  try {
    const [users] = await connection.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

<<<<<<< HEAD
// Create a new user route
app.post("/users", async (req, res) => {
  const { username, firstname, lastname, age, email, bio } = req.body;

  // Check if all required fields are provided
  if (!username || !firstname || !lastname || !email) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  // SQL query to insert user data into the database
  const query = "INSERT INTO users (username, firstname, lastname, age, email, bio) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [username, firstname, lastname, age, email, bio];

  try {
    // Execute the query to insert user data
    const [result] = await connection.execute(query, values);
    // Respond with the newly created user data
    res.status(201).json({ 
      user_id: result.insertId, 
      username, 
      firstname, 
      lastname, 
      age, 
      email, 
      bio 
    });
  } catch (error) {
    console.error("Error inserting user:", error);
=======
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
>>>>>>> 3b1b36e9b6a99b6553a77679e0aa60c5b8d8acfa
    res.status(500).json({ error: "Internal Server Error" });
  }
});

<<<<<<< HEAD
// Start the server and listen on port 3500
=======
<<<<<<< HEAD
<<<<<<< HEAD
const server = app.listen(5000, () => {
  console.log("Server started listening on localhost:5000");
=======
>>>>>>> 3b1b36e9b6a99b6553a77679e0aa60c5b8d8acfa
const server = app.listen(3500, () => {
  console.log("Server started listening on localhost:3500");
>>>>>>> shafik
});

// Gracefully shutdown the server on SIGINT signal
process.on('SIGINT', async () => {
  console.log('Stopping server...');
  try {
    if (connection) {
      // Close the database connection
      await connection.end();
    }
    // Close the server
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error occurred during shutdown:', error);
    process.exit(1);
  }
});
=======
app.listen(3500, function () {
  console.log("started listeing on localhost:3500");
});*/


//---the below code is working properly and it suppose to work for other html files as well---------------------------------------------------------------//


>>>>>>> shafik
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
      password: "Mystery12345",
      host: "localhost",
      database: "breezy-users",
    });
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Something went wrong with connecting to the database", error);
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
app.post("/users", async (req, res) => {
  const { username, firstname, lastname, age, email, password, bio, nickname } = req.body;

  if (!username || !firstname || !lastname || !email) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const query = "INSERT INTO users (username, firstname, lastname, age, nickname, email, password, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [username, firstname, lastname, age, nickname, email, password, bio];

  try {
    const [result] = await connection.execute(query, values);
    res.status(201).json({ 
      user_id: result.insertId, 
      username, 
      firstname, 
      lastname, 
      age, 
      nickname,
      email, 
      bio 
    });
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
  console.log("Server started listening on localhost:5000");
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
