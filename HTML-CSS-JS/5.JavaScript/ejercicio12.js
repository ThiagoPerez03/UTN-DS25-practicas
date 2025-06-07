// Crear una función que reciba un número que represente la altura de un medio-árbol. Deberá generar de manera escalonada el mismo. Ejemplo: si la altura es 5 deberá mostrar:
// *
// * *
// * * *
// * * * *
// * * * * *

function generarArbolEjercicio12() {
    const altura = parseInt(document.getElementById("alturaArbol12").value);
    const resultado = document.getElementById("resultadoArbol12");

    function generarMedioArbol(h) {
        if (isNaN(h) || h <= 0) {
            return "Por favor, ingrese un número válido mayor que 0.";
        }
        let arbol = '';
        for (let i = 1; i <= h; i++) {
            arbol += '* '.repeat(i).trim() + '\n';
        }
        return arbol;
    }
    resultado.textContent = generarMedioArbol(altura);
}
