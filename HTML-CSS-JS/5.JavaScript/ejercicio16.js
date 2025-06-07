// Desarrollemos un portero eléctrico:
// Tendrá dos visores, de dos posiciones el piso y una posición para dpto. Los pisos van del 00 al 48. Los dptos, del 1 al 6.
// El botón llamar, muestra el mensaje de abajo. El botón borrar limpia los visores y el mensaje de abajo. 
// Si se hace referencia a un piso y/o dpto que no existe, mostrar el error en el visor de abajo.

function llamar() {
    const pisoInput = document.getElementById("pisoInput").value;
    const dptoInput = document.getElementById("dptoInput").value;
    const mensajePortero = document.getElementById("mensajePortero");

    if (pisoInput === "" || dptoInput === "") {
        mensajePortero.textContent = "Error: Debe ingresar piso y departamento.";
        return;
    }

    const piso = parseInt(pisoInput);
    const dpto = parseInt(dptoInput);

    if (piso >= 0 && piso <= 48 && dpto >= 1 && dpto <= 6) {
        const pisoFormateado = String(piso).padStart(2, '0');
        mensajePortero.textContent = `Llamando al piso ${pisoFormateado}, dpto. ${dpto}...`;
    } else {
        mensajePortero.textContent = "Error: El piso o departamento no existe.";
    }
}

function borrarPortero() {
    document.getElementById("pisoInput").value = "";
    document.getElementById("dptoInput").value = "";
    document.getElementById("mensajePortero").textContent = "";
}