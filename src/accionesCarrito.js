import { actualizarTotalesCarrito } from './actualizarCarrito.js';
import { productos } from './stock.js';
import { obtenerCarritoStorage } from './storage.js';
import { mostrarProductos } from './App.js';
import { guardarCarritoStorage } from './storage.js';

let carrito = [];

const validarProductoRepetido = (productoId) => {

    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage();
    };

    const productoRepetido = carrito.find( producto => producto.id === productoId);

    if (productoRepetido) {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
        Toastify({
            text: `Se agregó otro ${productoRepetido.nombre}`,
            duration: 2000
        }).showToast();
    } else {
        agregarAlCarrito(productoId);
    }
};

const agregarAlCarrito = (productoId) => {
    const contenedor = document.getElementById("carrito-contenedor");
    const producto = productos.find( producto => producto.id === productoId );
    carrito.push(producto);

    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `
    contenedor.appendChild(div);
    actualizarTotalesCarrito(carrito);
    Toastify({
        text: `Se agregó el ${producto.nombre} al carrito`,
        duration: 2000
    }).showToast();
};

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById("carrito-contenedor");

    contenedor.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `
        contenedor.appendChild(div);
    });
};

const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter( producto => producto.id != productoId);

    actualizarTotalesCarrito(carritoActualizado);
    pintarCarrito(carritoActualizado);
};



// Borrar todas las compras

const vaciarCarrito = document.querySelector('#btn-del');

vaciarCarrito.addEventListener('click', () => {
    if(carrito.length === 0){
        Swal.fire(
            'Error',
            'El carrito esta vacio',
            'error'
        )
    }else{
        const act = carrito.length = []
        actualizarTotalesCarrito(act);
        pintarCarrito(act);
        Swal.fire(
            'Eliminado',
            'El carrito ha sido eliminado',
            'success'
        )
    }
})

export { agregarAlCarrito, validarProductoRepetido, pintarCarrito, eliminarProductoCarrito };