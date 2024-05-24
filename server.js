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
    console.log("Connected to the database");
  } catch (error) {
    console.error("Something went wrong with connecting to the database", error);
  }
}

connectDB();

// REST API routes
app.get("/users", async (req, res) => {
  try {
    const [users] = await connection.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/users", async (req, res) => {
  const { username, firstname, lastname, age, email, bio } = req.body;

  if (!username || !firstname || !lastname || !email) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const query = "INSERT INTO users (username, firstname, lastname, age, email, bio) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [username, firstname, lastname, age, email, bio];

  try {
    const [result] = await connection.execute(query, values);
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

const server = app.listen(5000, () => {
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
