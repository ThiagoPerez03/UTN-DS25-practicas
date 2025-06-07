// Crear una función que genere un array de varios elementos numéricos y muestre por pantalla el promedio de esos números.
//  El tamaño y los valores deben ser ingresados por el usuario (comando prompt) en dicho orden. 
// TIP: El dato ingresado con prompt es de tipo string, usar split() para quitar los espacios y usar la función Number para transformarlo.

function calcularPromedio() {
    const inputString = document.getElementById("numerosArray").value.trim();
    const resultado = document.getElementById("resultadoPromedio");

    if (inputString === "") {
        resultado.textContent = "No se ingresaron números.";
        return;
    }

    const numeros = inputString.split(" ").map(Number);
    let suma = 0;
    let validos = 0;

    for (let num of numeros) {
        if (!isNaN(num)) {
            suma += num;
            validos++;
        }
    }

    if (validos === 0) {
        resultado.textContent = "No se ingresaron números válidos.";
    } else {
        const promedio = suma / validos;
        resultado.textContent = `El promedio de los números ingresados es: ${promedio.toFixed(2)}`;
    }
}
