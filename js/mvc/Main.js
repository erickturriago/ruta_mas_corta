const modelo = new Modelo();
const vista = new Vista();
const controller = new Controlador(modelo, vista);

const divOrigen = document.querySelector('.origen')
const divDestino = document.querySelector('.destino')

const inputOrigen = document.querySelector('.inputOrigen')
const inputDestino = document.querySelector('.inputDestino')

const main = document.querySelector('main')

const btnCalcular = document.querySelector('.btnCalcular')
const btnMostrarDijkstra = document.querySelector('.btnMostrarDijkstra')
const btnMostrarAStar = document.querySelector('.btnMostrarAStar')

const sectionRutaMasCorta = document.querySelector('.ruta-mas-corta')
const sectionArbolRecubridor = document.querySelector('.arbol-recubridor')

const btnRutaCorta = document.querySelector('.btnRutaCorta')
const btnArbolRecubridor = document.querySelector('.btnArbolRecubridor')

let isActiveOrigen=false
let isActiveDestino=false


const desplegarMun = document.querySelectorAll('.desplegarMun');

inputOrigen.addEventListener("keyup", (event) => {
    let longitudInput = event.target.value.length;

    if(longitudInput>=3){
        console.log("Mostrando mun origen")
        let valorInput = event.target.value.toLowerCase();
        controller.cargarMunicipios(valorInput,'origen');
    }
    else{
        console.log("Ocultando")
        vista.ocultarMunicipios()
    }
});

//destino
inputDestino.addEventListener("keyup", (event) => {
    let longitudInput = event.target.value.length;

    if(longitudInput>=3){
        console.log("Mostrando mun dest")
        let valorInput = event.target.value.toLowerCase();

        controller.cargarMunicipios(valorInput,'destino');
    }
    else{
        console.log("Ocultando")
        vista.ocultarMunicipios()
    }
});


desplegarMun.forEach((boton)=>{
    boton.addEventListener('click',(event)=>{
        let padre = event.target.parentElement.getAttribute('class');
        if(padre=='origen'){
            console.log(isActiveOrigen)
            if(isActiveOrigen){
                vista.ocultarMunicipios()
                isActiveOrigen=false;
            }
            else{
                console.log("todos mun origen")
                controller.cargarTodosMunicipios('origen')
                isActiveOrigen=true;
            }
        }
        if(padre=='destino'){
            console.log(isActiveDestino)
            if(isActiveDestino){
                vista.ocultarMunicipios()
                isActiveDestino=false;
            }
            else{
                console.log("todo mun destino")
                controller.cargarTodosMunicipios('destino')
                isActiveDestino=true;
            }
        }
    })
})
main.addEventListener('click',(event)=>{
    // console.log(event.target)
    let classElement = event.target.classList;
    // console.log(classElement)
    if(!classElement.contains('desplegarMun','origen','destino')){
        console.log("ocultando todo")
        vista.ocultarMunicipios()
        isActiveOrigen=false
        isActiveDestino=false
    }
    if(classElement.contains('elementMunicipio')){
        const municipio = event.target
        let key = municipio.getAttribute('key')
        let padre = event.target.parentElement.parentElement.getAttribute('class')
        // console.log(padre)
        console.log(`Municipio seleccionado: ${key}`)

        if(padre=='origen'){
            controller.cargarMunicipioSeleccionado(key,'origen')
        }
        if(padre=='destino'){
            controller.cargarMunicipioSeleccionado(key,'destino')
        }
    }
})


btnCalcular.addEventListener('click',(event)=>{
    if(inputOrigen.value.length >=3 && inputDestino.value.length>=3){
        let munOrigen = inputOrigen.value
        let munDestino = inputDestino.value
        controller.busquedaAStar(munOrigen,munDestino)
        controller.busquedaDijkstra(munOrigen,munDestino)
        btnMostrarAStar.style.display = 'block'
        btnMostrarDijkstra.style.display = 'block'
    }
    else{
        alert("Debe seleccionar dos municipios")
    }
})
btnMostrarAStar.addEventListener('click',(event)=>{
    controller.pintarRuta('AStar')
})
btnMostrarDijkstra.addEventListener('click',(event)=>{
    controller.pintarRuta('Dijkstra')
})


btnRutaCorta.addEventListener('click',(event)=>{
    sectionRutaMasCorta.style.display='flex'
    sectionArbolRecubridor.style.display='none'
})
btnArbolRecubridor.addEventListener('click',(event)=>{
    sectionArbolRecubridor.style.display='flex'
    sectionRutaMasCorta.style.display='none'
})

controller.mostrarMarcadores()
