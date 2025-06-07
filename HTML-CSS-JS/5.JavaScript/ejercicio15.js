// Utilizar la función que genera el medio-árbol (ejercicio 12): crear un campo de entrada que le permita al usuario ingresar la altura del mismo. 
// Incluir un botón que al presionarlo, invoque a la función generada previamente con el valor ingresado por el usuario para que la misma muestre el medio-árbol.
// Deberá incluir validación de datos ingresados por el usuario.

document.addEventListener("DOMContentLoaded", function() {
    const generateTreeBtn = document.getElementById("generateTree"); 
    const treeHeightInput = document.getElementById("treeHeight");
    const treeOutput = document.getElementById("treeOutput");

    if (generateTreeBtn) {
        generateTreeBtn.addEventListener("click", function() {
            const altura = parseInt(treeHeightInput.value);
            if (isNaN(altura) || altura <= 0) {
                treeOutput.textContent = "Por favor, ingrese un número válido mayor que 0.";
                return;
            }
            
            let arbol = '';
            for (let i = 1; i <= altura; i++) {
                arbol += '* '.repeat(i).trim() + '\n';
            }
            treeOutput.textContent = arbol;
        });
    }
});

