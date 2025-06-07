// Evaluar si dos números son iguales, diferentes, mayor o menor. Resolver utilizando “if”/”else”.

function evaluar() {
    const numero1 = parseFloat(document.getElementById("numero1").value.trim());
    const numero2 = parseFloat(document.getElementById("numero2").value.trim());
    const resultadoEvaluacion = document.getElementById("resultadoEvaluacion");

    
    if (isNaN(numero1) || isNaN(numero2)) {
        resultadoEvaluacion.textContent = "Por favor, ingresa dos números válidos.";
    } else {
        if (numero1 > numero2) {
            resultadoEvaluacion.textContent = "El primer número es mayor que el segundo.";
        }
        else if (numero1 < numero2) {
            resultadoEvaluacion.textContent = "El primer número es menor que el segundo.";
        } else {
            resultadoEvaluacion.textContent = "Los números son iguales.";
        }
    }
}