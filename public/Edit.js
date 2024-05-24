document.addEventListener("DOMContentLoaded", function () {
    const updateForm = document.getElementById("updateForm");

    // Fetch and display existing user data
    const userId = 1; // Replace with the actual user ID you want to update
    fetchUser(userId).then(user => {
        document.getElementById("name").value = user.name;
        document.getElementById("nickname").value = user.nickname;
        document.getElementById("age").value = user.age;
        document.getElementById("bio").value = user.bio;
    }).catch(error => {
        console.error("There was a problem fetching the user data:", error);
    });

    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedData = {
            name: document.getElementById("name").value,
            nickname: document.getElementById("nickname").value,
            age: document.getElementById("age").value,
            bio: document.getElementById("bio").value
        };

        updateUser(userId, updatedData)
            .then(updatedUser => {
                alert("User information updated successfully.");
                window.location.href = "Users.html"; // Redirect after successful update
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
});*/
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
    const response = await fetch(`http://localhost:3500/users/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
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
    console.log("response", response.status)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
