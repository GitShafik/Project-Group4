document.addEventListener("DOMContentLoaded", function () {
    // Retrieve existing user data from localStorage
    const userData = JSON.parse(localStorage.getItem('profile.html'));

    if (userData) {
        // Pre-fill the form with existing user data
        document.getElementById('Name').value = userData.name;
        document.getElementById('Nickname').value = userData.nickname || '';
        document.getElementById('Age').value = userData.age;
        document.getElementById('Bio').value = userData.bio || '';
    }

    // Handle form submission
    const form = document.querySelector('.updateForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get updated values from the form
        const updatedName = document.getElementById('Name').value.trim();
        const updatedNickname = document.getElementById('Nickname').value.trim();
        const updatedAge = document.getElementById('Age').value.trim();
        const updatedBio = document.getElementById('Bio').value.trim();

        // Perform form validation 
        if (!updatedName || !updatedAge) {
            alert("First name, last name, and age are required.");
            return;
        }

        // Prepare updated user data
        const updatedUserData = {

            updatedName: updatedName,
            nickname: updatedNickname,
            age: updatedAge,
            bio: updatedBio
        };

        // Save updated user data to localStorage
        localStorage.setItem('profile.html', JSON.stringify(updatedUserData));
        // Store user data in localStorage
        localStorage.setItem('Users.html', JSON.stringify(formData));


    });

    // Function to handle the replacement of form fields
    document.querySelector('button').addEventListener('click', function () {

        document.getElementById('Name').value = prompt("Enter new Name:", document.getElementById('Name').value);
        document.getElementById('Nickname').value = prompt("Enter new Nickname:", document.getElementById('Nickname').value);
        document.getElementById('Age').value = prompt("Enter new Age:", document.getElementById('Age').value);
        document.getElementById('Bio').value = prompt("Enter new Bio:", document.getElementById('Bio').value);
    });

    // Handle clicking the Edit button to change profile picture
    const editButton = document.getElementById('editButton');
    const profilePicInput = document.getElementById('profilePicInput');

    editButton.addEventListener('click', function () {
        profilePicInput.click(); // Trigger the click event of the profile picture input
    });

    // Handle profile picture change
    profilePicInput.addEventListener('change', function (event) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgElement = document.getElementById('profilePic');
                imgElement.src = e.target.result; // Update the src attribute of the image element with the new image data
            }
            reader.readAsDataURL(file); // Read the selected file as a data URL
        }
    });
    fetch('http://localhost:3000/users', {
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