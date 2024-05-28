const queryString = window.location.search;
console.log("Query string:", queryString); // Check the query string
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log("ID:", id); // Check the value of the extracted ID
<<<<<<< HEAD
async function getUser(id) {
=======
<<<<<<< HEAD
async function getUser(id) {
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
  const response = await fetch(`http://localhost:3500/users/${id}`);
  const user = await response.json();
  return user;
>>>>>>> shafik
>>>>>>> 3b1b36e9b6a99b6553a77679e0aa60c5b8d8acfa
>>>>>>> shafik
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
    }
  } else {
    console.error('ID parameter is undefined'); // Handle case where ID parameter is undefined
  }
}
<<<<<<< HEAD
=======
<<<<<<< HEAD
main();
document.getElementById('editButton').addEventListener('click', function () {
  console.log('Edit button clicked');x
=======

>>>>>>> shafik
main();
document.getElementById('editButton').addEventListener('click', function () {
>>>>>>> 3b1b36e9b6a99b6553a77679e0aa60c5b8d8acfa
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get('id');
  window.location.href = `Edit.html?id=${id}`; // Redirect to the edit page with the selected ID
});