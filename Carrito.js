const arrayArticulos = [];

const articulo1 = new Articulo(1, 'shampoo', 1200);
const articulo2 = new Articulo(2, 'acondicionador', 1500);
const articulo3 = new Articulo(3, 'ambos', 2300);

arrayArticulos.push(articulo1, articulo2, articulo3);

// Función para ordenar precio de menor a mayor
const ordenarMenorMayor = () => {
    arrayArticulos.sort((a, b) => a.precio - b.precio);
    mostrarListaOrdenada();
};

// Función para ordenar precio de mayor a menor
const ordenarMayorMenor = () => {
    arrayArticulos.sort((a, b) => b.precio - a.precio);
    mostrarListaOrdenada();
};

const mostrarListaOrdenada = () => {
    let array = [];
    arrayArticulos.forEach(articulo => array.push(articulo.nombre+' $'+articulo.precio));
    alert('Lista de precios:'+'\n'+array.join('\n'));
};


function comprarArticulos() {
    let articuloNombre = '';
    let articuloCantidad = 0;
    let total = 0;
    let seguirComprando = false;

    do {
        articuloNombre = prompt('¿Queres comprar shampoo, acondicionador o ambos?', 'Ej: ambos');
        articuloCantidad = parseInt(prompt('¿Cuantos queres comprar?'));

        const articulo = arrayArticulos.find(articulo => articulo.nombre === articuloNombre);

        if (articulo) {
            total += articulo.precio * articuloCantidad;
        } else {
            alert('El articulo no se encuentra en stock.');
        }

        seguirComprando = confirm('¿Queres agregar otro articulo?');

    } while (seguirComprando)

    aplicarDescuento(total);
}

function aplicarDescuento(totalCompra) {
    if (totalCompra >= 5000) {
        totalCompra = totalCompra * 0.80;
        alert('Tenes un 20% de descuento!');
    }
    calcularEnvio(totalCompra)
}

function calcularEnvio(totalCompra) {
    let tieneEnvioADomicilio = confirm('Queres envio a domicilio?');

    if (tieneEnvioADomicilio && totalCompra >= 2000) {
        alert('Tenes envio gratis. El total de la compra es: '+totalCompra);
    } else if (tieneEnvioADomicilio && totalCompra < 2000 && totalCompra !== 0) {
        totalCompra += 700;
        alert('El envío cuesta $700. El total de la compra es: '+totalCompra);
    } else {
        alert('El total de la compra es: '+totalCompra);
    }
};

function comprar() {
    const quieroOrdenar =confirm('¿Querés ordenar la lista de articulos del mas barato al mas caro?');
    if (quieroOrdenar) {
        ordenarMenorMayor();
    } else {
        ordenarMayorMenor();
    }

    comprarArticulos();
};

comprar();


























// function comprarArticulos() {
//     let articulo = '';
//     let precio = 0;
//     let cantidad = 0;
//     let totalCompra = 0;
//     let cantidadTotal = 0;
//     let seguirComprando = false;

//     do {
//         articulo = prompt('¿Queres comprar shampoo, acondicionador o ambos?', 'Ej: ambos');
//         cantidad = parseInt(prompt('¿Cuantos queres comprar?'));

//         let cantidadValidada = validarCantidad(cantidad);

//         switch (articulo) {
//             case 'shampoo':
//                 precio = 500;
//                 break;
//             case 'acondicionador':
//                 precio = 700;
//                 break;
//             case 'ambos':
//                 precio = 1100;
//                 break;
//             default:
//                 alert('Alguno de los datos ingresados no es correcto.');
//                 precio = 0;
//                 cantidad = 0;
//                 break;
//         }

//         totalCompra += precio * cantidadValidada;
//         cantidadTotal += cantidad;

//         seguirComprando = confirm('¿Queres agregar otro articulo?');

//     } while (seguirComprando)

//     return totalCompra;
// }

// function validarCantidad(cantidad) {
//     while(Number.isNaN(cantidad) || cantidad === 0) {
//         if (cantidad !== 0) {
//             alert('Debe agregar un número.')
//         } else {
//             alert('Debe ingresar un número distinto de cero.')
//         }
//         cantidad = parseInt(prompt('¿Cuantos queres comprar?'));
//     }

//     return cantidad;
// }

// function aplicarDescuento(totalCompra) {
//     if (totalCompra >= 5000) {
//         return totalCompra * 0.80;
//     } else {
//         return totalCompra;
//     }
// }

// function calcularEnvio(totalCompra) {
//     let tieneEnvioADomicilio = confirm('Queres envio a domicilio?');

//     if (tieneEnvioADomicilio && totalCompra >= 2000) {
//         alert('Tenes envio gratis. El total de la compra es: '+totalCompra);
//     } else if (tieneEnvioADomicilio && totalCompra < 2000 && totalCompra !== 0) {
//         totalCompra += 700;
//         alert('El envío cuesta $700. El total de la compra es: '+totalCompra);
//     } else {
//         alert('El total de la compra es: '+totalCompra);
//     }
// }

// calcularEnvio(aplicarDescuento(comprarArticulos()));