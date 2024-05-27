const express = require("express");
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
      password: "Mystery12345",
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server and listen on port 3500
const server = app.listen(3500, () => {
  console.log("Server started listening on localhost:3500");
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
