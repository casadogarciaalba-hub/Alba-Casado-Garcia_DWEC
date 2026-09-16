console.log("¡Hola DWEC! Mi taller ya funciona.");

const boton = document.getElementById("boton");
const aviso = document.getElementById("aviso");
let contador = 0;

if (boton && aviso) {
  boton.addEventListener("click", function () {
    contador = contador + 1;
    aviso.textContent = "Has pulsado el botón " + contador + " veces";
  });
}

const modonoche = document.getElementById("modonoche");

modonoche.addEventListener("click", function () {
  document.body.classList.toggle("tema-claro");

  if (document.body.classList.contains("tema-claro")) {
    modonoche.textContent = "☀️";
  } else {
    modonoche.textContent = "🌙";
  }
});