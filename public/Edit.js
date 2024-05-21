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

        // Set up FileReader onload event
        reader.onload = function (e) {
            // Change the profile picture source
            const profilePicture = document.querySelector('.profilePicture');
            profilePicture.src = e.target.result;
        };

        // Read the selected file as Data URL
        reader.readAsDataURL(file);
    }
});



const updateForm = document.getElementById("updateForm");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Fetch and populate the form with user data
if (userId) {
    fetchUser(userId).then(user => {
        console.log(user);
        document.getElementById("username").value = user.username;
        document.getElementById("firstname").value = user.firstname;
        document.getElementById("lastname").value = user.lastname;
        document.getElementById("age").value = user.age;
        document.getElementById("email").value = user.email;
        document.getElementById("password").value = user.password;

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
    const response = await fetch(`http://localhost:5000/users/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateUser(userId, updatedData) {
    console.log("about to update", userId, updatedData)
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    console.log("response", response.status)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}







/*
const updateForm = document.getElementById("updateForm");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Fetch and populate the form with user data
if (userId) {
    fetchUser(userId).then(user => {
        console.log(user);
        document.getElementById("name").value = user.firstname;
        document.getElementById("Age").value = user.age;
    }).catch(error => {
        console.error("There was a problem fetching the user data:", error);
    });
}

updateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedData = {
        firstname: document.getElementById("name").value,
        nickname: document.getElementById("Nickname").value,
        age: document.getElementById("Age").value,
        bio: document.getElementById("Bio").value
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
    const response = await fetch(`http://localhost:5000/users/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateUser(userId, updatedData) {
    console.log("about to update", userId, updatedData)
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    console.log("response", response.status)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}*/