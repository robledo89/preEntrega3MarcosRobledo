///////////////// ARRAY DE CARGA DE HABITACIONES /////////////////
const visualizadorHabArray = [];

///////////////// CARRITO Y CHEQUEO NULL /////////////////////////
let carritoArray = [];

if (localStorage.getItem("carritoArray") === null) {
}
else {
    carritoArray = JSON.parse(localStorage.getItem("carritoArray"));
}

visualizadorHabArray.push(tipoReserva1);
visualizadorHabArray.push(tipoReserva2);
visualizadorHabArray.push(tipoReserva3);
visualizadorHabArray.push(tipoReserva4);

/////////////////////////////////////////////////////////////////////
//////////////////////// SELECTORES QUERYS //////////////////////////

const visualizadorHabitaciones = document.querySelector(".visualizadorHab");
const seleccionHabitacion = document.querySelectorAll(".botonHab");
const tituloParaHabitaciones = document.querySelector("#tituloHab");
let botonSeleccionado = document.querySelectorAll(".claseBotonSeleccionado");
const visualizadorCarrito = document.querySelector(".visualizadorCarrito");

const textoReservaVacia = document.querySelector(".textoReservaVacia");
const textoContenidoCarrito = document.querySelector(".textoContenidoCarrito");

const reservas = document.querySelector(".reservas");
const checkout = document.querySelector(".checkout");

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////// CARGAR HABITACIONES AL DIV EN RESERVAS //////////////
function cargaVisualizador(tipoHabSeleccionada) {
    visualizadorHabitaciones.innerHTML = '';
    tipoHabSeleccionada.forEach(elementos => {

        const div = document.createElement("div");
        div.classList.add("col-lg-6", "col-md-6", "col-sm-12", "text-center");
        div.innerHTML = `
        <div id="tarjetasHab" class="card">
            <img src="${elementos.foto}" alt=""/>
                <div class="card-body">
                    <h2>${elementos.nombre}</h2>
                    <p>Cama: ${elementos.cama}</p>
                    <p>Capacidad (personas): ${elementos.capacidad}</p>
                    <p>Size: ${elementos.metraje} m²</p>
                    <p>Precio: $ ${elementos.precio}</p>
                    <button name="tarjetas" id= "${elementos.id}" class="col-12 mx-auto buttonForm botonHab claseBotonSeleccionado">Seleccionar</button>
                </div>
        </div>
        `;
        visualizadorHabitaciones.append(div);

    })
    funcionHabSeleccionar();
}

////////////// MOSTRAR TIPO HABITACIONES SEGUN ELECCION //////////////
seleccionHabitacion.forEach(botonTipoHab => {
    botonTipoHab.addEventListener("click", (e) => {
        // RELLENA BACKGROUND DE COLOR EL BTN ACTIVADO
        seleccionHabitacion.forEach(botonTipoHab => botonTipoHab.classList.remove("btnHabActivo"));
        e.currentTarget.classList.add("btnHabActivo");

        // FILTRO TIPO DE HABITACION MEDIANTE IF
        if (e.currentTarget.id != "Total") {
            if (e.currentTarget.id === "Lago") {
                tituloParaHabitaciones.innerText = "Habitaciones del Lago";
                const filtroTipoHab = visualizadorHabArray.filter(habitacion => habitacion.tipoHabitacion === e.currentTarget.id)
                cargaVisualizador(filtroTipoHab);
            } else if (e.currentTarget.id === "Jardin") {
                tituloParaHabitaciones.innerText = "Habitaciones del Jardin";
                const filtroTipoHab = visualizadorHabArray.filter(habitacion => habitacion.tipoHabitacion === e.currentTarget.id)
                cargaVisualizador(filtroTipoHab);
            }
        } else {
            tituloParaHabitaciones.innerText = "Todas las Habitaciones";
            cargaVisualizador(visualizadorHabArray);
        }
    })
});

///////////////// FUNCION DE BOTON HABITACION SELECCIONADA (sumar al carrito)
function funcionHabSeleccionar() {
    botonSeleccionado = document.querySelectorAll(".claseBotonSeleccionado");
    botonSeleccionado.forEach(boton => {
        boton.addEventListener("click", sumarAlCarrito);
    })
}

///////////////// FUNCION PARA SUMAR ITEMS AL CARRITO

function sumarAlCarrito(e) {
    const idHab = e.currentTarget.id;
    const habSeleccionada = visualizadorHabArray.find(habitacion => habitacion.id == idHab)
    carritoArray.push(habSeleccionada);

    localStorage.setItem("carritoArray", JSON.stringify(carritoArray));
    console.log("OK en array carrito? Enviado a check", carritoArray);
}

////////////// CARGAR ITEMS AL CARRITO
function crearCheckout() {
    visualizadorCarrito.innerHTML = '';
    carritoArray.forEach(elementos => {

        let div = document.createElement('div');
        div.classList.add("col-lg-12", "col-md-12", "col-sm-12", "text-center");
        div.innerHTML = `
        <div id="tarjetasHab" class="card">
            <img src="${elementos.foto}" alt=""/>
                <div class="card-body">
                    <h2>${elementos.nombre}</h2>
                    <p>Cama: ${elementos.cama}</p>
                    <p>Capacidad (personas): ${elementos.capacidad}</p>
                    <p>Size: ${elementos.metraje} m²</p>
                    <p>Precio: $ ${elementos.precio}</p>
                    <button id= "eliminar" class="col-12 mx-auto buttonForm botonHab">Eliminar</button>
                </div>
        </div>
        `
            ;
        visualizadorCarrito.append(div);
        console.log("Post creacion?", visualizadorCarrito);
        console.log("div", div);
    });
};

///////////// CONSULTA PARA APLICAR FUNCIONES ////////////
if (checkout) {
    if (localStorage.getItem("carritoArray") !== null) {
        textoReservaVacia.remove();
    } else {
        textoContenidoCarrito.remove();
    }
    crearCheckout();
}

if (reservas) {
    cargaVisualizador(visualizadorHabArray);
}
