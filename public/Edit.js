document.addEventListener("DOMContentLoaded", function () {
    const updateForm = document.getElementById("updateForm");


/*profile pic change*/

document.getElementById('profilePicInput').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            this.value = ''; // Clear the input
            return;
        }
        // Create a FileReader object
        const reader = new FileReader();

    async function fetchUser(userId) {
        const response = await fetch(`http://localhost:3500/users/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    async function updateUser(userId, updatedData) {
        const response = await fetch(`http://localhost:3500/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
});
const updateForm = document.getElementById("updateForm");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
console.log(userId)
// Fetch and populate the form with user data
if (userId) {
    fetchUser(userId).then(user => {
        document.getElementById("username").value = user.username;
        document.getElementById("firstname").value = user.firstname;
        document.getElementById("lastname").value = user.lastname;
        document.getElementById("age").value = user.age;
        document.getElementById("email").value = user.email;
        document.getElementById("password").value = user.password;
        console.log(user);
    }).catch(error => {
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
    console.log(updatedData)
    updateUser(userId, updatedData)
        .then(updatedUser => {
            alert("User information updated successfully.");
            // window.location.href = "Users.html"; // Redirect after successful update
        })
        .catch(error => {
            console.error("There was a problem updating the user:", error);
            alert("Error updating user. Please try again later.");
        });
});
async function fetchUser(userId) {
    const response = await fetch(`http://localhost:3500/users/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}
async function updateUser(userId, updatedData) {
    console.log("about to update", userId, updatedData)
    const response = await fetch(`http://localhost:3500/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    //console.log("response", response.status)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}
document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');
    // Perform any actions based on the selected ID, such as pre-filling form fields
});