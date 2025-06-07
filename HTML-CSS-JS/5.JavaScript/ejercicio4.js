// Utilizando “switch”. Definir una variable numérica. Asignarle un valor entre 1 y 10; mostrar a qué grupo pertenece:
// Grupo 1: del 1 al 3
// Grupo 2: del 4 al 6
// Grupo 3: del 7 al 10
// Modifiquemos el ejercicio para que el número lo ingrese el usuario (con “prompt”).

function evaluarGrupo() {
    const num = parseInt(document.getElementById("numGrupo").value);
    const resultado = document.getElementById("resultadoGrupo");
    if (isNaN(num)) {
        resultado.textContent = "Por favor, ingrese un número.";
        return;
    }
    switch (true) {
        case (num >= 1 && num <= 3):
            resultado.textContent = "Pertenece al Grupo 1.";
            break;
        case (num >= 4 && num <= 6):
            resultado.textContent = "Pertenece al Grupo 2.";
            break;
        case (num >= 7 && num <= 10):
            resultado.textContent = "Pertenece al Grupo 3.";
            break;
        default:
            resultado.textContent = "Número fuera de rango (debe ser entre 1 y 10).";
    }
}
