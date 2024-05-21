// Get a reference to the form element
const form = document.querySelector('form');

// Add an event listener for the form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior


    async function getAllUsers() {
        const response = await fetch("http://localhost:3500/users");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const users = await response.json();
        return users;
    }
    // Get form inputs
    const username = form.elements['username'].value;
    const firstname = form.elements['firstname'].value;
    const lastname = form.elements['lastname'].value;
    const age = form.elements['age'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;

    // Validate form inputs (you can add more validation logic here)
    if (!username || !firstname || !lastname || !age || !email || !password) {
        alert('Please fill in all fields.');
        return;

    }

    // If all inputs are filled, you can proceed with form submission or other actions
    // For example, you can send the form data to the server using fetch API
    const formData = {
        username,
        firstname,
        lastname,
        age,
        email,
        password
    };


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
    },

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

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            updateUser(user.id, {
                firstname: nameInput.value,
                age: ageInput.value,
                bio: bioInput.value,
                nickname: nicknameInput.value
            }).then(updatedUser => {
                li.querySelector("a").textContent = updatedUser.firstname;
                li.removeChild(form);
            }).catch(error => {
                console.error("There was a problem updating the user:", error);
                alert("Error updating user. Please try again later.");
            });
        });

        // Append the form to the list item
        li.appendChild(form);
    },

    async function updateUser(userId, updatedData) {
        const response = await fetch(`http://localhost:3500/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

    fetch('http://localhost:3500/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Form data sent successfully:', data);
        // Optionally, you can redirect the user to another page or show a success message
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        // Handle errors, show error message to the user, etc.
    });
});


