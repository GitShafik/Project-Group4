const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getUser(id) {
  const response = await fetch(`http://localhost:3500/users/${id}`);
  const user = await response.json();
  return user;
}

async function main() {
  const user = await getUser(id);
  // TODO: add user to DOM
}
main();