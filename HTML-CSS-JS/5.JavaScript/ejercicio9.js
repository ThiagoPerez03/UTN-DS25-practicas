// Crear una función, a partir de la lógica aplicada en ejercicio 3, 
// que reciba dos valores y muestre cuál es el mayor. En caso de ser iguales, deberá indicarlo.

function compararEjercicio9() {
    const num1 = parseFloat(document.getElementById("num9_1").value);
    const num2 = parseFloat(document.getElementById("num9_2").value);
    const resultado = document.getElementById("resultadoComparar9");

    function comparar(a, b) {
        if (a > b) return "El primer número es mayor.";
        if (a < b) return "El segundo número es mayor.";
        return "Los números son iguales.";
    }

    if (isNaN(num1) || isNaN(num2)) {
        resultado.textContent = "Por favor, ingrese dos números válidos.";
    } else {
        resultado.textContent = comparar(num1, num2);
    }
}
