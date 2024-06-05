const mensajes = document.getElementById("mensajes");
const mensajeInput = document.getElementById("mensaje-input");
const botonEnviar = document.getElementById("boton-enviar");
const botonAddContacto = document.getElementById("boton-add-contacto");

const enviarMensaje = () => {
  const mensajeUsuario = mensajeInput.value;

  if (!mensajeUsuario) {
    return;
  }

  const mensajeUsuarioDiv = document.createElement("div");
  mensajeUsuarioDiv.classList.add("mensaje", "der");

  const mensajeUsuarioP = document.createElement("p");
  mensajeUsuarioP.textContent = mensajeUsuario;

  mensajeUsuarioDiv.appendChild(mensajeUsuarioP);
  mensajes.appendChild(mensajeUsuarioDiv);
  mensajeInput.value = "";

  setTimeout(() => {
    const mensajeContactoDiv = document.createElement("div");
    mensajeContactoDiv.classList.add("mensaje", "izq");
    const mensajeContactoP = document.createElement("p");
    const mensajeContacto = [
      "¿Cómo estás?",
      "¿Qué tal el día?",
      "¿Qué tal el fin de semana?",
      "¿Qué tal el trabajo?",
      "¿Tus compañeros te caen bien?",
      "¿Tienes pareja?",
      "¿Qué has comido hoy?",
      "¿Has ido al gym?",
    ];
    const mensajeAleatorio = Math.floor(Math.random() * mensajeContacto.length);
    mensajeContactoP.textContent = mensajeContacto[mensajeAleatorio];
    mensajeContactoDiv.appendChild(mensajeContactoP);
    mensajes.appendChild(mensajeContactoDiv);
  }, 1000);
};

botonEnviar.addEventListener("cliclck", enviarMensaje);
mensajeInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    enviarMensaje();
  }
});

function mostrarMensajes() {
  const mensajes = document.getElementById("mensajes");
  mensajes.innerHTML = "";
}

let contacto = 1;
function addContacto() {
  const listaContactos = document.getElementById("lista-contactos");
  const nuevoContacto = document.createElement("li");
  nuevoContacto.innerText = `Contacto ${contacto}`;
  nuevoContacto.addEventListener("click", () => {
    let contactoSeleccionado = nuevoContacto.innerText;
    document.getElementById("nombre-contacto").innerText = contactoSeleccionado;
    mostrarMensajes();
  });
  listaContactos.appendChild(nuevoContacto);
  contacto++;
}
botonAddContacto.addEventListener("click", addContacto);
