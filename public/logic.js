const db = require("./database.js");
async function getUsersFromDB() {
  try {
    const connection = await db.connectDB();
    const [users] = await connection.query("SELECT * FROM users");
    return users;
  } catch (error) {
    console.error("Error querying users:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
//const connection = require(‘./connection’);
async function fetchUserById(userId) {
  try {
    const connection = await db.connectDB();
    const [users] = await connection.query(
      "SELECT * FROM users WHERE user_id = ?",
    
      [userId]
    );
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Internal Server Error");
  }
}
// Function to fetch a single user by ID
async function getUserById(userId) {
  try {
    const connection = await db.connectDB();
    const [user] = await connection.query(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    ); // Query the database
    connection.release(); // Release the connection
    return user[0]; // Return the fetched user
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Internal Server Error");
  }
}
async function updateUserById(userId, updatedData) {
  try {
    const connection = await db.connectDB();
    const [result] = await connection.query(
      "UPDATE users SET ? WHERE user_id = ?",
      [updatedData, userId]
    ); // Update the user in the database
    connection.release(); // Release the connection
    return result.affectedRows > 0; // Return true if user updated successfully
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Internal Server Error");
  }
}
async function deleteUserById(userId) {
  try {
    const connection = await db.connectDB();
    const [result] = await connection.query(
      "DELETE FROM users WHERE user_id = ?",
      [userId]
    );
  

    //connection.release();
    console.log(result);
    return result.ResultSetHeader.affectedRows > 0;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Internal Server Error");
  }
}
module.exports = {
  getUsersFromDB,
  getUserById,
  fetchUserById,
  updateUserById,
  deleteUserById,
};











