// Generar un array con 10 números, recorrerlo e ir multiplicando todos los elementos, finalmente obtener el producto total.


function calcularProducto() {
    let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let productoTotal = 1;
    for (let i = 0; i < numeros.length; i++) {
        productoTotal = productoTotal * numeros[i];
    }
    document.getElementById("resultadoProducto").textContent = "El producto total de los números es: " + productoTotal;
}
