console.log("¡Hola DWEC! Mi taller ya funciona."); 
const boton = document.getElementById("boton");
const aviso = document.getElementById("aviso");
let contador = 0;

boton.addEventListener("click", function () {
  contador = contador + 1;
  aviso.textContent = "Has pulsado el botón " + contador + " veces";
});