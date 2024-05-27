document.getElementById("userForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    async function getAllUsers() {
        const response = await fetch("http://localhost:3500/users");
if (!response.ok) {
    throw new Error(" was not ok");
}
const users = await response.json();
return users;
}
    // Get form inputs
    const username = document.getElementById("username").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    const password = document.getElementById("password").value;
    // Validate form inputs (you can add more validation logic here)
    if (!username || !firstname || !lastname || !age || !email || !password) {
        alert("Please fill in all fields");
        return;
    }
    // Form data object
    const formData = {
        username,
        firstname,
        lastname,
        age: parseInt(age),
        email,
        bio
    };
    // Send data to the server
    try {
        const response = await fetch("http://localhost:3500/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Form data sent successfully:", data);
        alert("User created successfully");
        // Optionally, redirect or show success message
    } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        alert("Failed to create user. Please try again.");
    }
});