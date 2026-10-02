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