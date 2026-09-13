const contenedor = document.querySelector("#contenedorUsuarios");

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

function mostrarUsuarios(usuarios) {
 contenedor.innerHTML = "";
 usuarios.forEach(usuario => {
 const tarjeta = document.createElement("article");
 tarjeta.classList.add("tarjeta");
 tarjeta.innerHTML = `
 <h3>${usuario.name}</h3>
 <p>${usuario.username}</p>
 <p>${usuario.email}</p>
 <p>${usuario.phone}</p>
 <p>${usuario.address.city}</p>
 <p>${usuario.company.name}</p>
 <p><a href="https://${usuario.website}" target="_blank">${usuario.website}</a></p>
 `;
 contenedor.appendChild(tarjeta);
  });
}

async function cargarUsuarios() {
 const response = await fetch(
 "https://jsonplaceholder.typicode.com/users"
 );
 const usuarios = await response.json();
 mostrarUsuarios(usuarios);
}
cargarUsuarios();