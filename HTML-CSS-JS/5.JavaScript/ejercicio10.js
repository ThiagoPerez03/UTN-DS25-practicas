// Crear una función que reciba un número y muestre tantos asteriscos como la cantidad de veces que se pasó como parámetro.

function generarAsteriscos() {
    const numero = parseInt(document.getElementById("numAsteriscos").value);
    const resultado = document.getElementById("resultadoAsteriscos");
    if (isNaN(numero) || numero < 0) {
        resultado.textContent = "Por favor, ingrese un número válido.";
        return;
    }
    let asteriscos = '';
    for (let i = 0; i < numero; i++) {
        asteriscos += '*';
    }
    resultado.textContent = asteriscos;
}
