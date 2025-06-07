// Crear una función que reciba un número que indica el día de la semana y retorne una cadena de texto indicando a qué día corresponde. 
// Ejemplo: si es 1, deberá retornar lunes, 2 retornará martes, y así siguiendo. Si el día es 6 o 7 deberá retornar “fin de semana”.
// En caso de un valor que no represente un día de la semana deberá retornar un mensaje de error.

function mostrarDiaSemana() {
    const dia = parseInt(document.getElementById("numDia").value);
    const resultado = document.getElementById("resultadoDia");

    switch (dia) {
        case 1: resultado.textContent = "Lunes"; break;
        case 2: resultado.textContent = "Martes"; break;
        case 3: resultado.textContent = "Miércoles"; break;
        case 4: resultado.textContent = "Jueves"; break;
        case 5: resultado.textContent = "Viernes"; break;
        case 6: case 7: resultado.textContent = "Fin de semana"; break;
        default: resultado.textContent = "Error: El valor debe ser entre 1 y 7.";
    }
}
