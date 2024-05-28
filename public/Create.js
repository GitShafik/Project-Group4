document.getElementById('userForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    async function getAllUsers() {
        console.log("getAllUsers function called");  // adding here the console.log as well for updates.
        const response = await fetch("http://localhost:3500/users");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const users = await response.json();
        return users;
    }

    // Get form inputs
    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;
    const password = document.getElementById('password').value;

    // Validate form inputs (you can add more validation logic here)
    if (!username || !firstname || !lastname || !age || !email || !password) {
        alert('Please fill in all fields.');
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
        const response = await fetch('http://localhost:3500/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const user = await response.json();

        // Assuming there is an element with id 'userList' to append the new user to
        const ul = document.getElementById('userList');
        const li = document.createElement("li");

        // Create a link to the user's profile
        const a = document.createElement("a");
        a.setAttribute("href", `profile.html?id=${user.id}`);
        a.textContent = user.firstname; // Display only the first name as the link text

        // Create a button to remove the user
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            // Call a function to remove the user from the server
            removeUser(user.id)
                .then(() => {
                    // Remove the list item from the DOM if the removal was successful
                    li.remove();
                })
                .catch(error => {
                    console.error("There was a problem removing the user:", error);
                    // Handle errors, show error message to the user, etc.
                    alert("Error removing user. Please try again later.");
                });
        });

        // Create a button to edit the user
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            showEditForm(user, li);
        });

        // Append the link, edit button, and remove button to the list item
        li.appendChild(a);
        li.appendChild(editButton);
        li.appendChild(removeButton);

        // Append the list item to the user list
        ul.appendChild(li);

        console.log('Form data sent successfully:', user);
        alert('User created successfully');
        // Optionally, redirect or show success message
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        alert('Failed to create user. Please try again.');
    }

    function showEditForm(user, li) {
        // Create a form for editing user details
        const form = document.createElement("form");

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = user.firstname;
        form.appendChild(nameInput);

        const ageInput = document.createElement("input");
        ageInput.type = "number";
        ageInput.value = user.age;
        form.appendChild(ageInput);

        const bioInput = document.createElement("input");
        bioInput.type = "text";
        bioInput.value = user.bio;
        form.appendChild(bioInput);

        const nicknameInput = document.createElement("input");
        nicknameInput.type = "text";
        nicknameInput.value = user.nickname;
        form.appendChild(nicknameInput);

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        form.appendChild(saveButton);

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {
                const updatedUser = await updateUser(user.id, {
                    firstname: nameInput.value,
                    age: ageInput.value,
                    bio: bioInput.value,
                    nickname: nicknameInput.value
                });
                li.querySelector("a").textContent = updatedUser.firstname;
                li.removeChild(form);
            } catch (error) {
                console.error("There was a problem updating the user:", error);
                alert("Error updating user. Please try again later.");
            }
        });

        // Append the form to the list item
        li.appendChild(form);
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

        const updatedUser = await response.json();
        return updatedUser;
    }

    async function removeUser(userId) {
        const response = await fetch(`http://localhost:3500/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }
});
