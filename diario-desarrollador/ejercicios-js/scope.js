let mensaje = "global";

function saludar() {
  let mensaje = "dentro de la función";
  console.log(mensaje);
}

saludar();
console.log(mensaje);

if (true) {
  let secreto = 42;
}
console.log(secreto);