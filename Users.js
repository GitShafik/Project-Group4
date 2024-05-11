

async function getAllUsers() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
}

function appendToList(ul, user) {
  const li = document.createElement("li");
  const text = document.createTextNode(`${user.id}: ${user.name}, ${user.age}`);
  li.appendChild(text);
  ul.appendChild(li);
}
document.addEventListener("DOMContentLoaded", async function() {
  const users = await getAllUsers();
  const ul = document.getElementById("users");
  users.forEach(user => appendToList(ul, user));
});