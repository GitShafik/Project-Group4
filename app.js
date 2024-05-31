const express = require('express');
const app = express();
app.use(express.static("public"));
app.use(express.json());
const { getUsers, getUserById, createUser, updateUser, deleteUser, userExists } = require("./logic");
app.use(express.json());


//logics for integration testing

// Fetch all users

app.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/users", async (req, res) => {
    try {
        const userId = await createUser(req.body);
        res.status(201).json({ user_id: userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        const success = await updateUser(req.params.id, req.body);
        if (success) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        // Check if the user exists before attempting to delete
        const exists = await userExists(userId);
        if (!exists) {
            return res.status(404).json({ error: "User not found" });
        }

        const success = await deleteUser(userId);
        if (success) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(500).json({ error: "Failed to delete user" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = app;