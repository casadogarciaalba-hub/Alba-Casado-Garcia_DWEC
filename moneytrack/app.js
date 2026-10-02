/* =============================================================
   MoneyTrack · Práctica final de JavaScript
   Desarrollo Web en Entorno Cliente · 2º DAW
   Alumna: Alba Casado García
   ============================================================= */


/* =============================================================
   NIVEL 1 · Los cimientos: variables y tipos
   ============================================================= */

// Titular de la cuenta (texto). Es const porque no va a cambiar.
const titular = "Alba Casado García";

// Saldo con el que empieza la cuenta (número). Es const porque no cambia:
// lo que cambian son los movimientos, y el saldo actual se calcula con ellos.
const saldoInicial = 1200;

// Símbolo de la moneda (texto).
const moneda = "€";

/**
 * formatearDinero(cantidad)
 * Recibe un número y devuelve un texto con dos decimales, coma
 * decimal (formato español) y el símbolo de la moneda.
 * Ejemplo: 85.5 -> "85,50 €"
 */
function formatearDinero(cantidad) {
  return cantidad.toFixed(2).replace(".", ",") + " " + moneda;
}

// Pruebas del nivel 1 (se ven en la consola con F12)
console.log("Titular:", titular);
console.log("Saldo inicial:", formatearDinero(saldoInicial));
console.log("Prueba 85.5 ->", formatearDinero(85.5));
console.log("Prueba -20 ->", formatearDinero(-20));





/* =============================================================
   NIVEL 2 · El modelo de datos: array de objetos
   Ingresos = importes POSITIVOS · Gastos = importes NEGATIVOS
   ============================================================= */

// Array de movimientos. Cada movimiento es un objeto con:
// id (único), concepto, importe, categoria y fecha.
// Es let (y no const) porque en el nivel 6 lo cambiaremos al borrar.
let movimientos = [
  { id: 1, concepto: "Nómina septiembre",       importe: 1450,  categoria: "Nómina",     fecha: "2026-09-01" },
  { id: 2, concepto: "Compra semanal",          importe: -86.4, categoria: "Comida",     fecha: "2026-09-03" },
  { id: 3, concepto: "Abono transporte",        importe: -20,   categoria: "Transporte", fecha: "2026-09-05" },
  { id: 4, concepto: "Cine y palomitas",        importe: -18.5, categoria: "Ocio",       fecha: "2026-09-12" },
  { id: 5, concepto: "Venta libros de segunda", importe: 45,    categoria: "Extra",      fecha: "2026-09-15" },
  { id: 6, concepto: "Cena con amigas",         importe: -32.9, categoria: "Ocio",       fecha: "2026-09-20" },
  { id: 7, concepto: "Factura internet",        importe: -35,   categoria: "Hogar",      fecha: "2026-09-25" },
  { id: 8, concepto: "Compra supermercado",     importe: -54.2, categoria: "Comida",     fecha: "2026-09-28" }
];

// Prueba del nivel 2: muestra el array como tabla en la consola
console.log("Número de movimientos:", movimientos.length);
console.table(movimientos);




/* =============================================================
   NIVEL 3 · Cálculos con funciones y bucles
   ============================================================= */

/**
 * totalIngresos()
 * Recorre el array con un bucle y suma solo los importes positivos.
 */
function totalIngresos() {
  let suma = 0;
  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].importe > 0) {
      suma += movimientos[i].importe;
    }
  }
  return suma;
}

/**
 * totalGastos()
 * Recorre el array con un bucle y suma solo los importes negativos.
 * Devuelve un número negativo (o 0 si no hay gastos).
 */
function totalGastos() {
  let suma = 0;
  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].importe < 0) {
      suma += movimientos[i].importe;
    }
  }
  return suma;
}

/**
 * saldoActual()
 * Devuelve el saldo inicial + ingresos + gastos.
 * Los gastos ya son negativos, así que al sumarlos restan.
 */
function saldoActual() {
  return saldoInicial + totalIngresos() + totalGastos();
}

/**
 * mostrarResumenConsola()
 * Muestra por consola el resumen de la cuenta usando formatearDinero.
 */
function mostrarResumenConsola() {
  console.log("=== Resumen de la cuenta ===");
  console.log("Saldo inicial: " + formatearDinero(saldoInicial));
  console.log("Ingresos:      " + formatearDinero(totalIngresos()));
  console.log("Gastos:        " + formatearDinero(totalGastos()));
  console.log("Saldo actual:  " + formatearDinero(saldoActual()));
}

// Prueba del nivel 3
mostrarResumenConsola();




/* =============================================================
   NIVEL 4 · Métodos de array: filtrar y transformar (DOM)
   ============================================================= */

// Lista de categorías posibles (para rellenar el desplegable).
const CATEGORIAS = ["Nómina", "Comida", "Transporte", "Ocio", "Hogar", "Extra"];

// Referencias a los elementos del HTML que vamos a usar.
const cuerpoTabla     = document.getElementById("cuerpo-tabla");
const filtroCategoria = document.getElementById("filtro-categoria");

/**
 * formatearFecha(fechaISO)
 * Convierte "2026-09-01" en "01/09/2026".
 */
function formatearFecha(fechaISO) {
  const partes = fechaISO.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

/**
 * crearCelda(texto, clase)
 * Crea una celda <td> con el texto indicado y, si se pasa, una clase CSS.
 * Usa textContent para que el texto no se interprete como HTML.
 */
function crearCelda(texto, clase) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  if (clase) celda.className = clase;
  return celda;
}

/**
 * pintarTabla(lista)
 * Vacía el cuerpo de la tabla y pinta una fila por cada movimiento
 * de la lista recibida. El importe sale en verde si es ingreso
 * y en rojo si es gasto.
 */
function pintarTabla(lista) {
  cuerpoTabla.innerHTML = "";

  // Si no hay movimientos que mostrar, se avisa con una fila.
  if (lista.length === 0) {
    const fila = document.createElement("tr");
    const celda = crearCelda("No hay movimientos en esta categoría.", "vacio");
    celda.colSpan = 4;
    fila.appendChild(celda);
    cuerpoTabla.appendChild(fila);
    return;
  }

  lista.forEach(function (mov) {
    const fila = document.createElement("tr");

    fila.appendChild(crearCelda(formatearFecha(mov.fecha)));
    fila.appendChild(crearCelda(mov.concepto));
    fila.appendChild(crearCelda(mov.categoria));

    // Clase según sea ingreso (verde) o gasto (rojo).
    const claseImporte = mov.importe > 0 ? "importe ingreso" : "importe gasto";
    fila.appendChild(crearCelda(formatearDinero(mov.importe), claseImporte));

    cuerpoTabla.appendChild(fila);
  });
}

/**
 * movimientosFiltrados()
 * Devuelve los movimientos de la categoría elegida en el desplegable
 * usando filter. Si se elige "todas", devuelve el array completo.
 */
function movimientosFiltrados() {
  const categoria = filtroCategoria.value;
  if (categoria === "todas") {
    return movimientos;
  }
  return movimientos.filter(function (mov) {
    return mov.categoria === categoria;
  });
}

/**
 * rellenarFiltro()
 * Añade al desplegable la opción "Todas" y una opción por categoría.
 */
function rellenarFiltro() {
  filtroCategoria.innerHTML = '<option value="todas">Todas</option>';
  CATEGORIAS.forEach(function (cat) {
    filtroCategoria.appendChild(new Option(cat, cat));
  });
}

// Al cambiar el desplegable, se vuelve a pintar la tabla con la lista filtrada.
filtroCategoria.addEventListener("change", function () {
  pintarTabla(movimientosFiltrados());
});

// Inicio del nivel 4: se rellena el filtro y se pinta la tabla completa.
rellenarFiltro();
pintarTabla(movimientos);