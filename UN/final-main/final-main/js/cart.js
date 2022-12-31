const carrito = []
const container = document.querySelector("div.container")


//Agrego evento click en todas las tarjetas
const activarBotonesAdd = ()=> { 
    const botonesAdd = document.querySelectorAll(".button.button-outline.button-add")
    botonesAdd.forEach(btn => btn.addEventListener("click", (e)=> agregarAlCarrito(e)))
}

//Recorro array y cargo tarjetas en el html -- ya no uso mas por incorporar fetch
/* const cargarMisProductos = ()=> { 
    container.innerHTML = ""
    productos.forEach(producto => container.innerHTML += retornoCard(producto))
    activarBotonesAdd()         
}
cargarMisProductos() */

const cargarMisProductos = async () => {
	container.innerHTML = "";
	productos = await conectaMockapi();
	if (productos !== "Error" && productos !== "Not found" && productos.length > 0) {
		productos.forEach(
			(producto) => (container.innerHTML += retornoCard(producto))
		);
	} else {
		container.innerHTML = retornoError();
	}
	activarBotonesAdd(); 
};
cargarMisProductos();

const mostrarTabla=document.querySelector("#tablaCarrito")
const mostrarContenido=document.querySelector("#contenidoCarrito")

//Agrego productos al carrito
const agregarAlCarrito = (e)=> { 
    let resultado = productos.find(prod => prod.nombre === e.target.id)
        if (resultado !== undefined) {
            carrito.push(resultado)
            guardarCarrito()
            mostrarTabla.style.display=""
            mostrarContenido.innerHTML=""
            carrito.forEach((producto) => {
                mostrarContenido.innerHTML += tablaCarrito(producto)
            })
            carritoTotal = carrito.reduce(
                (acc, itemCarrito) => acc+itemCarrito.precio,0
            )
            mostrarContenido.innerHTML +=
            `<tr>
            <td>Total</td>
            <td>${carritoTotal}</td>
        </tr>`
        }
}


const guardarCarrito = ()=> {
    if (carrito.length > 0) { localStorage.setItem("carrito", JSON.stringify(carrito)) }
}

const recuperarCarrito = ()=> {
    if (localStorage.getItem("carrito")) {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
            carritoRecuperado.forEach(producto => carrito.push(producto))
    } else {
        console.warn("No se encontró un carrito.")
    }
}
recuperarCarrito()

//armo funcion carrito

const tablaCarrito=(itemCarrito)=> {
    return `<tr>
                <td>${itemCarrito.nombre}</td>
                <td>${itemCarrito.precio}</td>
            </tr>`
        
}

//Borro carrito
function borrarCarrito() {
    localStorage.removeItem("carrito")
    mostrarContenido.innerHTML = ""
    carrito.splice(0,carrito.length)
    mostrarTabla.style.display="none"
}
const borroCarrito =document.querySelector("#borroCarrito")
borroCarrito.addEventListener("click",borrarCarrito)



