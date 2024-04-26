function validateForm() {
    let username = document.getElementById("username").value;
    let firstname = document.getElementById("firstname").value;
    let  lastname = document.getElementById("lastname").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Simple validation example (you may want to add more checks)
    if (username === "" || firstname === "" || lastname === "" || age === "" || email === "" || password === "") {
        alert("All fields must be filled out");
        return false;
    }
}