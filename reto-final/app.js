/* =============================================================
   Reto final · Tabla de videojuegos + formulario
   Desarrollo Web en Entorno Cliente · 2º DAW
   Alumna: Alba Casado García
   ============================================================= */

// Array de videojuegos. Cada juego es un objeto con
// nombre, compania, plataforma, valoracion (0-10) y precio (€).
const videojuegos = [
  { nombre: "Zelda: Tears of the Kingdom", compania: "Nintendo", plataforma: "Nintendo Switch", valoracion: 9.6, precio: 59.99 },
  { nombre: "Mario Kart 8 Deluxe", compania: "Nintendo", plataforma: "Nintendo Switch", valoracion: 9.2, precio: 49.99 },
  { nombre: "EA Sports FC 25", compania: "Electronic Arts", plataforma: "PlayStation 5", valoracion: 7.4, precio: 69.99 },
  { nombre: "Minecraft", compania: "Mojang", plataforma: "PC", valoracion: 9.0, precio: 29.99 },
  { nombre: "Spider-Man 2", compania: "Insomniac Games", plataforma: "PlayStation 5", valoracion: 9.0, precio: 79.99 },
  { nombre: "Forza Horizon 5", compania: "Playground Games", plataforma: "Xbox Series X", valoracion: 9.1, precio: 59.99 }
];

// Referencia al cuerpo de la tabla en el HTML.
const cuerpoTabla = document.getElementById("cuerpo-tabla");



/**
 * formatearPrecio(precio)
 * Devuelve el precio con dos decimales, coma y símbolo €.
 */
function formatearPrecio(precio) {
  return precio.toFixed(2).replace(".", ",") + " €";
}

/**
 * crearCelda(texto, clase)
 * Crea una celda <td> con el texto y, si se pasa, una clase CSS.
 */
function crearCelda(texto, clase) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  if (clase) celda.className = clase;
  return celda;
}

/**
 * pintarTabla()
 * Vacía la tabla y crea una fila por cada juego del array.
 */
function pintarTabla() {
  cuerpoTabla.innerHTML = "";

  videojuegos.forEach(function (juego) {
    const fila = document.createElement("tr");
    fila.appendChild(crearCelda(juego.nombre));
    fila.appendChild(crearCelda(juego.compania));
    fila.appendChild(crearCelda(juego.plataforma));
    fila.appendChild(crearCelda("★ " + juego.valoracion, "valoracion"));
    fila.appendChild(crearCelda(formatearPrecio(juego.precio), "precio"));
    cuerpoTabla.appendChild(fila);
  });
}

// Al cargar la página se pinta la tabla.
pintarTabla();





/* =============================================================
   RETO FINAL 03 · Leer los datos del formulario
   RETO FINAL 04 · Añadir el juego a la tabla
   RETO FINAL 05 · Validación y limpiar el formulario
   ============================================================= */

// Recuperamos el formulario y el botón "Añadir juego" por su id.
const formulario = document.getElementById("formulario");
const btnAnadir  = document.getElementById("btn-anadir");

// 05 · Párrafo para avisar al usuario (se crea justo debajo del formulario).
const mensaje = document.createElement("p");
mensaje.className = "mensaje";
formulario.after(mensaje);

/**
 * mostrarMensaje(texto, tipo)
 * Enseña un aviso debajo del formulario. tipo puede ser "error" u "ok".
 */
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

// Ponemos el botón a la escucha del clic.
btnAnadir.addEventListener("click", function () {

  // 03 · Recogemos lo que ha escrito el usuario (propiedad value).
  const nombre     = document.getElementById("input-nombre").value.trim();
  const compania   = document.getElementById("input-compania").value.trim();
  const plataforma = document.getElementById("input-plataforma").value;

  // La valoración y el precio llegan como texto: los pasamos a número.
  const valoracion = parseFloat(document.getElementById("input-valoracion").value);
  const precio     = parseFloat(document.getElementById("input-precio").value);

  // 05 · Validación: si algún campo está vacío, avisamos y NO añadimos.
  if (nombre === "" || compania === "" || plataforma === "" || isNaN(valoracion) || isNaN(precio)) {
    mostrarMensaje("⚠️ Rellena todos los campos antes de añadir el juego.", "error");
    return;
  }

  // 05 · Validación extra: valores con sentido.
  if (valoracion < 0 || valoracion > 10) {
    mostrarMensaje("⚠️ La valoración tiene que estar entre 0 y 10.", "error");
    return;
  }
  if (precio < 0) {
    mostrarMensaje("⚠️ El precio no puede ser negativo.", "error");
    return;
  }

  // 04 · Creamos un objeto nuevo con la misma forma que los del array.
  const nuevoJuego = {
    nombre: nombre,
    compania: compania,
    plataforma: plataforma,
    valoracion: valoracion,
    precio: precio
  };

  // Lo añadimos al array de videojuegos y repintamos la tabla.
  videojuegos.push(nuevoJuego);
  pintarTabla();

  // 05 · Limpiamos el formulario para poder meter otro juego cómodamente.
  formulario.reset();
  document.getElementById("input-nombre").focus();
  mostrarMensaje("✅ " + nombre + " se ha añadido a la colección.", "ok");
});




