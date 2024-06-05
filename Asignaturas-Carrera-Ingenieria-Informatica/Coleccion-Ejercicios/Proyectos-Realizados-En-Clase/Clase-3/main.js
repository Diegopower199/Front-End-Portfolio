var pagina = 1;
var paginaEncontradaNombre = 1;
var buscarNombre = false;

function fetchChars() {
  buscarNombre = false;

  window.scroll(0, 0);

  if (pagina == 1) {
    document.getElementById("botonBack").style.display = "none";
  } else {
    document.getElementById("botonBack").style.display = "flex";
  }

  if (pagina == 20) {
    document.getElementById("botonNext").style.display = "none";
  } else {
    document.getElementById("botonNext").style.display = "flex";
  }

  fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
    .then((data) => data.json())
    .then((chars) => {
      var container = document.getElementById("results");
      container.innerHTML = "";

      var contadorDiv = 0;
      chars.results.forEach((char) => {
        var div = document.createElement("div");
        div.style.width = 300;
        div.style.height = 360;
        div.style.margin = 20 + "px";
        div.style.backgroundColor = "#4C9EE7";

        div.innerHTML = `<img src="${char.image}" /><h3>${char.name}</h3>`;

        container.appendChild(div);
        contadorDiv += 1;
      });

      if (contadorDiv !== 20) {
        document.getElementById("botonNext").style.display = "none";
      }
    });
}

function findCharacterName() {
  buscarNombre = true;
  window.scroll(0, 0);

  if (paginaEncontradaNombre == 1) {
    document.getElementById("botonBack").style.display = "none";
  } else {
    document.getElementById("botonBack").style.display = "flex";
  }

  if (paginaEncontradaNombre == 20) {
    document.getElementById("botonNext").style.display = "none";
  } else {
    document.getElementById("botonNext").style.display = "flex";
  }

  var name = document.getElementById("nombreBuscar");
  if (name.value === undefined || name.value === "") {
    pagina = 1;
    fetchChars();
    return;
  }

  fetch(
    `https://rickandmortyapi.com/api/character/?&name=${name.value}&page=${paginaEncontradaNombre}`
  )
    .then((data) => data.json())
    .then((chars) => {
      var container = document.getElementById("results");
      container.innerHTML = "";

      var contadorDiv = 0;
      chars.results.forEach((char) => {
        var div = document.createElement("div");
        div.style.width = 300;
        div.style.height = 360;
        div.style.margin = 20 + "px";
        div.style.backgroundColor = "#4C9EE7";

        div.innerHTML = `
                            <img src="${char.image}" />
                            <h3>${char.name}</h3>
                        `;
        container.appendChild(div);
        contadorDiv += 1;
      });

      if (contadorDiv !== 20) {
        document.getElementById("botonNext").style.display = "none";
      }
    });
}

function changePageNext() {
  if (buscarNombre == false) {
    if (pagina != 20) {
      pagina += 1;
      fetchChars();
      return;
    }
  } else {
    paginaEncontradaNombre += 1;
    findCharacterName();
    return;
  }
}

function changePageBack() {
  if (buscarNombre == false) {
    if (pagina != 1) {
      pagina = pagina - 1;
      fetchChars();
      return;
    }
  } else {
    paginaEncontradaNombre = paginaEncontradaNombre - 1;
    findCharacterName();
    return;
  }
}
