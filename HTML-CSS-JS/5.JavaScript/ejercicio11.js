// Crear una función que reciba el monto de un producto, y el medio de pago: C (tarjeta de crédito), E (efectivo) y D (tarjeta de débito). 
// Si el monto del producto es menor a $200 no se aplicará ningún descuento, pero si el monto a abonar es entre $200 y $400 se aplicará un descuento del 30% si el medio de pago es efectivo, 20% si se realiza con débito y 10% con tarjeta de crédito. 
// Para montos mayores a $400, el descuento es el mismo sin importar el medio de pago, dicho descuento es del 40%. 
// La función deberá retornar el monto final a abonar.

function calcularMontoFinal() {
    const monto = parseFloat(document.getElementById("montoProducto").value);
    const medio = document.getElementById("medioDePago").value;
    const resultado = document.getElementById("resultadoMonto");

    if (isNaN(monto) || monto < 0) {
        resultado.textContent = "Por favor, ingrese un monto válido.";
        return;
    }
    
    let descuento = 0;
    if (monto >= 200 && monto <= 400) {
        switch (medio) {
            case 'E': descuento = 0.30; break;
            case 'D': descuento = 0.20; break;
            case 'C': descuento = 0.10; break;
        }
    } else if (monto > 400) {
        descuento = 0.40;
    }
    
    const montoFinal = monto - (monto * descuento);
    resultado.textContent = `El monto final a abonar es: $${montoFinal.toFixed(2)}`;
}
