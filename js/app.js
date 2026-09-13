const contenedor = document.querySelector("#contenedorUsuarios");
const mensaje = document.querySelector("#mensaje");
const buscar = document.querySelector("#buscar");
const botonLimpiar = document.querySelector("#botonLimpiar");
const botonOrdenar = document.querySelector("#botonOrdenar");
 
let usuariosGlobales = [];
let ordenAscendente = false;
 
function mostrarUsuarios(usuarios) {
  contenedor.innerHTML = "";
 
  if (usuarios.length === 0) {
    mensaje.textContent = "No se encontraron usuarios con ese criterio.";
    return;
  }
  mensaje.textContent = "";
 
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
  try {
    mensaje.textContent = "Cargando usuarios...";
 
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
 
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
 
    usuariosGlobales = await response.json();
    mostrarUsuarios(usuariosGlobales);
    mensaje.textContent = "";
  } catch (error) {
    mensaje.textContent = "No fue posible cargar la información.";
    console.error(error);
  }
}
 
function obtenerFiltrados() {
  const texto = buscar.value.toLowerCase();
 
  return usuariosGlobales.filter(usuario =>
    usuario.name.toLowerCase().includes(texto) ||
    usuario.email.toLowerCase().includes(texto) ||
    usuario.address.city.toLowerCase().includes(texto)
  );
}
 
function actualizarLista() {
  const filtrados = obtenerFiltrados();
 
  if (ordenAscendente) {
    filtrados.sort((a, b) => a.name.localeCompare(b.name));
  }
 
  mostrarUsuarios(filtrados);
}
 
buscar.addEventListener("input", actualizarLista);
 
botonLimpiar.addEventListener("click", () => {
  buscar.value = "";
  buscar.focus();
  actualizarLista();
});
 
botonOrdenar.addEventListener("click", () => {
  ordenAscendente = !ordenAscendente;
  botonOrdenar.setAttribute("aria-pressed", String(ordenAscendente));
  botonOrdenar.textContent = ordenAscendente ? "Orden original" : "Ordenar A-Z";
  actualizarLista();
});
 
cargarUsuarios();