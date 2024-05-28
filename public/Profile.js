document.addEventListener('DOMContentLoaded', async function () {
  const queryString = window.location.search;
  console.log("Query string:", queryString); // Check the query string
  const params = new URLSearchParams(queryString);
  const userId = params.get('id');
  console.log("ID:", userId); // Check the value of the extracted ID

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
    }
  } else {
    console.error('ID parameter is undefined or missing');
  }

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