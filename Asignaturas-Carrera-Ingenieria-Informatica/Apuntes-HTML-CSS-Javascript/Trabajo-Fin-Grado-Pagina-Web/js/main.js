function hola() {
  console.log(document.getElementById("usuario"));
}

function verificarUsuario() {
  const usuarioBBDD = "a";
  const passwordBBDD = "q";

  let idUsuarioHtml = document.getElementById("usuario");
  let idPasswordHtml = document.getElementById("contrasena");

  let usuario = idUsuarioHtml.value;
  let password = idPasswordHtml.value;

  console.log(usuario);
  console.log(password);

  if (usuario == usuarioBBDD && password == passwordBBDD) {
    console.log("es igual");
  } else {
    console.log("es distinto");
  }
}

function crearUsuario() {
  let idFirstName = document.getElementById("First-Name");
  let idLastName = document.getElementById("Last-Name");
  let idUsuario = document.getElementById("Id-Usuario");
  let idEmail = document.getElementById("Email");
  let idPassword = document.getElementById("Password");
  let idConfirmPassword = document.getElementById("Confirm-Password");

  let firstName = String(idFirstName.value);
  let lastName = String(idLastName.value);
  let usuario = String(idUsuario.value);
  let email = String(idEmail.value);
  let password = String(idPassword.value);
  let confirmPassword = String(idConfirmPassword.value);

  let encontrarUsuario = false;
  let comprobacionNombre = true;
  let comprobacionApellido = true;
  let comprobacionEmail = true;
  let comprobacionPassword = true;

  if (!/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/.test(firstName)) {
    console.log("NO puedes poner ese nombre");
    comprobacionNombre = false;
  }

  if (!/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/.test(lastName)) {
    console.log("NO puedes poner ese apellido");
    comprobacionApellido = false;
  }

  if (encontrarUsuario) {
    console.log("Ya existe este usuario");
    encontrarUsuario = true;
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
    console.log("NO EXISTE ESE CORREO");
    comprobacionEmail = false;
  }

  if (password !== confirmPassword) {
    console.log("No hay coincidencia entre las contraseñas");
    comprobacionPassword = false;
  }

  if (
    encontrarUsuario === false &&
    comprobacionNombre === true &&
    comprobacionApellido === true &&
    comprobacionEmail === true &&
    comprobacionPassword === true
  ) {
    window.location.href =
      "/home/diego/Apuntes de HTML, CSS y Javascript/Trabajo-Fin-Grado-Pagina-Web/Pantalla-Login.html";
  } else {
    console.log("Poner los errores, que me da pereza hacerlo");
  }
}

function pantallaOlvidarContrasena() {}
