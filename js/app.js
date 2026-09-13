

fetch("https://jsonplaceholder.typicode.com/users")
 .then(response => response.json())
 .then(data => {
 console.log(data);
 console.log(data[0]);
 console.log(data[0].name);
 })
 .catch(error => console.error(error));

 async function cargarUsuarios() {
 const response = await fetch(
 "https://jsonplaceholder.typicode.com/users"
 );
 const usuarios = await response.json();
 console.log(usuarios);
}
cargarUsuarios();