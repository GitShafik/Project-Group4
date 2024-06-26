document
    .getElementById("profilePicInput")
    .addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                this.value = ""; // Clear the input
                return;
            }
            // Create a FileReader object
            const reader = new FileReader();
            // Set up FileReader onload event
            reader.onload = function (e) {
                // Change the profile picture source
                const profilePicture = document.querySelector(".profilePicture");
                profilePicture.src = e.target.result;
            };
            // Read the selected file as Data URL
            reader.readAsDataURL(file);
            async function fetchUser(userId) {
                const response = await fetch(`http://localhost:3500/users/${userId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            }
            async function updateUser(userId, updatedData) {
                const response = await fetch(`http://localhost:3500/users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            }
        }
    });
const updateForm = document.getElementById("updateForm");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
console.log(userId);
// Fetch and populate the form with user data
if (userId) {
    fetchUser(userId)
        .then((user) => {
            document.getElementById("username").value = user.username;
            document.getElementById("firstname").value = user.firstname;
            document.getElementById("lastname").value = user.lastname;
            document.getElementById("age").value = user.age;
            document.getElementById("email").value = user.email;
            document.getElementById("password").value = user.password;
            // Populate nickname and bio if they exist
            if (user.nickname) {
                document.getElementById("nickname").value = user.nickname;
            }
            if (user.bio) {
                document.getElementById("bio").value = user.bio;
            }
            console.log(user);
        })
        .catch((error) => {
            console.error("There was a problem fetching the user data:", error);
        });
}
updateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const updatedData = {
        username: document.getElementById("username").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        age: document.getElementById("age").value,
        nickname: document.getElementById("nickname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        bio: document.getElementById("bio").value,
    };
    console.log(updatedData);
    updateUser(userId, updatedData)
        .then((updatedUser) => {
            alert("User information updated successfully.");
            // window.location.href = "Users.html"; // Redirect after successful update
        })
        .catch((error) => {
            console.error("There was a problem updating the user:", error);
            alert("Error updating user. Please try again later.");
        });
});
async function fetchUser(userId) {
    const response = await fetch(`http://localhost:3500/users/${userId}`);
    //console.log(response.status)
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}
async function updateUser(userId, updatedData) {
    //console.log("about to update", userId, updatedData)
    console.log("about to update", userId, updatedData);
    const response = await fetch(`http://localhost:3500/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });
    //console.log("response", response.status)
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}
document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    // Perform any actions based on the selected ID, such as pre-filling form fields
});
// Ensure nickname and bio are shown on edit page if they exist
async function getUser(id) {
    try {
        const response = await fetch(`http://localhost:3500/users/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null; // or handle the error in a different way
    }
}
async function main() {
    if (id) {
        const user = await getUser(id);
        if (user) {
            // Add user data to the DOM
            document.getElementById("name").innerText = `@${user.username}`;
            document.getElementById("nickname").innerText = user.nickname;
            document.getElementById("age").innerText = user.age;
            document.getElementById("bio").innerText = user.bio;
        } else {
            // Handle case where user data is not available
            console.error("User data is unavailable");
        }
    } else {
        console.error("ID parameter is undefined"); // Handle case where ID parameter is undefined
    }
}
main();
document.getElementById("editButton").addEventListener("click", function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    window.location.href = `Edit.html?id=${id}`; // Redirect to the edit page with the selected ID
});
