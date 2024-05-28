document.addEventListener('DOMContentLoaded', async function () {
  const queryString = window.location.search;
  console.log("Query string:", queryString); // Check the query string
  const params = new URLSearchParams(queryString);
  const userId = params.get('id');
  console.log("ID:", userId); // Check the value of the extracted ID

<<<<<<< HEAD
  if (userId) {
    try {
      const user = await fetchUser(userId);
      if (user) {
        // Populate the profile page with user data
        document.getElementById('username').innerText = user.username;
        document.getElementById('firstname').innerText = user.firstname;
        document.getElementById('lastname').innerText = user.lastname;
        document.getElementById('age').innerText = user.age;
        document.getElementById('email').innerText = user.email;
        document.getElementById('nickname').innerText = user.nickname || 'No nickname provided';
        document.getElementById('bio').innerText = user.bio || 'No bio provided';
      } else {
        console.error('User data is unavailable');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
=======
async function getUser(id) {
<<<<<<< HEAD
>>>>>>> 3b1b36e9b6a99b6553a77679e0aa60c5b8d8acfa
>>>>>>> shafik
  try {
    const response = await fetch(`http://localhost:3500/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // or handle the error in a different way
  }
  const response = await fetch(`http://localhost:3500/users/${id}`);
  const user = await response.json();
  return user;
}
async function main() {
  if (id) {
    const user = await getUser(id);
    if (user) {
      // Add user data to the DOM
      document.getElementById('name').innerText = `@${user.username}`;
      document.getElementById('nickname').innerText = user.nickname;
      document.getElementById('age').innerText = user.age;
      document.getElementById('bio').innerText = user.bio;
    } else {
      // Handle case where user data is not available
      console.error('User data is unavailable');
>>>>>>> b77a446937b5efd507d145a42c574920d8d91f4b
    }
  } else {
    console.error('ID parameter is undefined or missing');
  }
<<<<<<< HEAD

  const editButton = document.getElementById('editButton');
  if (editButton) {
    editButton.addEventListener('click', function () {
      if (userId) {
        window.location.href = `edit.html?id=${userId}`; // Navigate to the edit page with the user ID
      } else {
        console.error('Cannot navigate to edit page: userId is missing');
      }
    });
  } else {
    console.error('Edit button not found on the page');
  }
});

async function fetchUser(userId) {
  const response = await fetch(`http://localhost:3500/users/${userId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
=======
}
main();
document.getElementById('editButton').addEventListener('click', function () {
  console.log('Edit button clicked');x

main();
document.getElementById('editButton').addEventListener('click', function () {
>>>>>>> 3b1b36e9b6a99b6553a77679e0aa60c5b8d8acfa
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get('id');
  window.location.href = `Edit.html?id=${id}`; // Redirect to the edit page with the selected ID
});
>>>>>>> b77a446937b5efd507d145a42c574920d8d91f4b
