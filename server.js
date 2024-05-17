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
      password: "root",
      host: "localhost",
      database: "users",
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

app.listen(3000, function () {
  console.log("started listeing on localhost:3000");
});