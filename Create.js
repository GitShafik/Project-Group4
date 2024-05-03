

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        let formData = new FormData(form);

        // Convert form data to JSON
        let jsonObject = {};
        formData.forEach(function (value, key) {
            jsonObject[key] = value;
        });

        // Example: Log form data as JSON
        console.log(JSON.stringify(jsonObject));

        // Example: Send form data to server using fetch API
        fetch('/save_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        })
        .then(response => {
            if (response.ok) {
                // Handle success
                console.log('User data saved successfully');
                // You can redirect or show a success message here
            } else {
                // Handle errors
                console.error('Failed to save user data');
                // You can show an error message to the user here
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

