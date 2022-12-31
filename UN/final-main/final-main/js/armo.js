//creo variable para traer datos de Mockapi

let productos = []
const URL = "https://638386ee6e6c83b7a995e8a5.mockapi.io/carrito"
const conectaMockapi = async () =>{
    try {
		const response = await fetch(URL);
		informacion = await response.json();
		localStorage.setItem("productos", JSON.stringify(informacion));
		return informacion;
	} catch (error) {
		return "Error";
	}
}


// Armo html desde JS

const retornoCard = (producto)=> {
    return `<div class="card">
                <div class="card-image">${producto.imagen}</div>
                <div class="card-name">${producto.nombre}</div>
                <div class="card-price">$ ${producto.precio}</div>
                <div class="card-button">
                    <button class="button button-outline button-add" id="${producto.nombre}" title="Clic para agregar el '${producto.nombre}' al carrito">+</button>
                </div>
            </div>`
}

const retornoError = ()=> {
return  `<div class="card-error">
            <h2>Detectamos un problema en la operacion</h2>
            <h3>No se puedo cargar los productos</h3>
            <h3>Por favor intenta nuevamente mas tarde</h3>
        </div>`
}