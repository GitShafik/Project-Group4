document.addEventListener("DOMContentLoaded", async function () {
  const userList = document.getElementById("users");

// Fetch users data from the server
getAllUsers()
  .then(users => {
    // Populate the user list with fetched data
    users.forEach(user => {
      appendToList(userList, user);
    });
  })
  .catch(error => {
    console.error("There was a problem with fetching users:", error);
    // Handle errors, show error message to the user, etc.
  });


async function getAllUsers() {
  const response = await fetch("http://localhost:4000/users");
  if (!response.ok) {
      throw new Error("Network response was not ok");
  }
  const users = await response.json();
  return users;
}

function appendToList(ul, user) {
  const li = document.createElement("li");

  // Create a link to the user's profile
  const a = document.createElement("a");
  a.setAttribute("href", `profile.html?id=${user.id}`);
  a.textContent = user.firstname; // Display only the first name as the link text

  // Create a button to remove the user
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
      // Call a function to remove the user from the list
      removeUser(user.id);
      // Remove the list item from the DOM
      li.remove();
  });

  // Append the link and remove button to the list item
  li.appendChild(a);
  li.appendChild(removeButton);

  // Append the list item to the user list
  ul.appendChild(li);
}

function removeUser(userId) {
  // Remove the user from the list in the UI
  const userItem = document.getElementById(userId);
  if (userItem) {
      userItem.remove();
  }

  // Send a request to the backend to remove the user from the database
  fetch(`http://localhost:4000/users/${userId}`, {
      method: 'DELETE'
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('User removed successfully:', data);
  })
  .catch(error => {
      console.error('There was a problem removing the user:', error);
  });
}
});