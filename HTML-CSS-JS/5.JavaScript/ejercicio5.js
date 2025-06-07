// Realizar la sumatoria de 0 a 10 y devolver el valor de la misma.


function calcularSumatoria() {
    let suma = 0;
    for (let i = 0; i <= 10; i++) {
        suma = suma + i; 
    }
    document.getElementById("resultadoSumatoria").textContent = "La sumatoria de 0 a 10 es: " + suma;
}
