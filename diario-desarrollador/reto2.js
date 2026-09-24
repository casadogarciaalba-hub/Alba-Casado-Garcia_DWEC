// Array con las tareas del día
const tareas = ["Estudiar JavaScript", "Hacer la compra", "Entrenar", "Ver una serie"];
// Horas disponibles para hacer las tareas
let horasDisponibles = 4;
// Bucle que muestra cada tarea numerada por consola
for (let i = 0; i < tareas.length; i++) {
  console.log((i + 1) + ". " + tareas[i]);
}
// Decisión según las horas disponibles
if (horasDisponibles > 5) {
  console.log("Día tranquilo");
} else if (horasDisponibles >= 3) {
  console.log("Día normal");
} else {
  console.log("Día ajustado");
}


