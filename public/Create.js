// Get a reference to the form element
const form = document.querySelector('form');

// Add an event listener for the form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

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

    fetch('http://localhost:5000/users', {
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


