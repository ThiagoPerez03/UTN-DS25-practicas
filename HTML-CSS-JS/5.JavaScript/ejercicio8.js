// Crear una función que reciba dos cadenas y retorne la concatenación de la misma.

function concatenarEjercicio8() {
    const cadena1 = document.getElementById("cadena8_1").value;
    const cadena2 = document.getElementById("cadena8_2").value;
    const resultado = document.getElementById("resultadoConcatenar8");
    if (cadena1.trim() === "" && cadena2.trim() === "") {
        resultado.textContent = "Por favor, ingrese al menos una cadena.";
    } else {
        resultado.textContent = `Concatenación: ${cadena1 + cadena2}`;
    }
}
