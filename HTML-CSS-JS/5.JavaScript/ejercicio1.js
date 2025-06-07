// Definir una variable numérica, asignarle un valor y sumarle 5.

function sumar() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultado = document.getElementById("resultadoSuma");

    if (isNaN(num1) || isNaN(num2)) {
        resultado.textContent = "Por favor, ingresa dos números válidos.";
    } else {
        resultado.textContent = `El resultado de la suma es: ${num1 + num2}`;
    }
}
