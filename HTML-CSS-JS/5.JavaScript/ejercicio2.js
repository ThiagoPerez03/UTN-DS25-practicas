// Definir dos variables de cadenas, asignarles valores y concatenarlas.

function concatenar() {
    const cadena1 = document.getElementById("cadena1");
    const cadena2 = document.getElementById("cadena2");
    const resultado = document.getElementById("resultadoConcatenacion");
    if (cadena1.trim() === "" || cadena2.trim() === "") {
        resultado.textContent = "Por favor, ingresa dos cadenas válidas.";
    } else {
        resultado.textContent = `El resultado de la concatenación es: ${cadena1 + cadena2}`;
    }
}
