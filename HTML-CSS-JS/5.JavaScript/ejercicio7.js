// Crear una función que reciba dos valores y retorne el producto de los mismos.

function mostrarProducto() {
    const num1 = parseFloat(document.getElementById("mult1").value);
    const num2 = parseFloat(document.getElementById("mult2").value);
    const resultado = document.getElementById("resultadoProductoFunc");
    if (isNaN(num1) || isNaN(num2)) {
        resultado.textContent = "Por favor, ingrese dos números válidos.";
    } else {
        resultado.textContent = `El producto es: ${num1 * num2}`;
    }
}
