const contenedor = document.querySelector("#contenedorUsuarios");

let usuariosGlobales = [];

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

async function cargarUsuarios() {
 const mensaje = document.querySelector("#mensaje");
 try {
 mensaje.textContent = "Cargando usuarios...";
 const response = await fetch(
 "https://jsonplaceholder.typicode.com/users"
 );
 if (!response.ok) {
 throw new Error(`Error HTTP: ${response.status}`);
 }
 const usuarios = await response.json();
 mostrarUsuarios(usuarios);
 mensaje.textContent = "";
 } catch (error) {
 mensaje.textContent = "No fue posible cargar la información.";
  console.error(error);
 }
}

async function cargarUsuarios() {
 const response = await fetch(
 "https://jsonplaceholder.typicode.com/users"
 );
 usuariosGlobales = await response.json();
 mostrarUsuarios(usuariosGlobales);
}
const buscar = document.querySelector("#buscar");
buscar.addEventListener("input", () => {
 const texto = buscar.value.toLowerCase();
 const filtrados = usuariosGlobales.filter(usuario =>
 usuario.name.toLowerCase().includes(texto)
 );
 mostrarUsuarios(filtrados);
});