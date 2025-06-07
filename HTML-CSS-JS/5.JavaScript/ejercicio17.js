// Desarrollemos un teclado en pantalla:
// Cada línea del teclado debe hacerse en un array.
// Al presionar cada tecla (botón) deberá mostrarse en el display.
// La muestra estará centralizada en una sola función.
// Debe existir un botón para borrar el display.
// Botón Backspace.

const fila1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const fila2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
const fila3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const todasLasFilas = [fila1, fila2, fila3];


function agregarCaracter(char) {
    const display = document.getElementById("tecladoDisplay");
    display.value += char;
}


function borrarUltimoCaracter() {
    const display = document.getElementById("tecladoDisplay");
    display.value = display.value.slice(0, -1);
}


function limpiarDisplay() {
    document.getElementById("tecladoDisplay").value = "";
}

function generarTeclado() {
    const contenedor = document.getElementById("tecladoContenedor");
    
    todasLasFilas.forEach(fila => {
        const divFila = document.createElement("div");
        divFila.className = "teclado-fila";
        
        fila.forEach(letra => {
            const boton = document.createElement("button");
            boton.textContent = letra;
            boton.onclick = function() {
                agregarCaracter(letra);
            };
            divFila.appendChild(boton);
        });
        
        contenedor.appendChild(divFila);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    generarTeclado();
});
