let signo = "";
let numeroAntesDelSigno;
let numeroDespuesDelSigno;

function ponerNumerosTextField(numero) {
  document.getElementById("textNumeros").value += numero;
}

function seleccionSignoOperativo(signoOperativo) {
  signo = signoOperativo;
  numeroAntesDelSigno = document.getElementById("textNumeros").value;
  document.getElementById("textNumeros").value = "";
}

function sumarDosValores() {
  numeroDespuesDelSigno = document.getElementById("textNumeros").value;
  document.getElementById("textNumeros").value =
    parseFloat(numeroAntesDelSigno) + parseFloat(numeroDespuesDelSigno);
}
