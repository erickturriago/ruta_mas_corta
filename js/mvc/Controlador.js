class Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }

    cargarMunicipios(iniciales,input){
        const municipios = this.modelo.buscarMunicipios(iniciales)
        this.vista.mostrarMunicipios(municipios,input)
    }

    cargarTodosMunicipios(input){
        const municipios = this.modelo.getTodosMunicipios()
        this.vista.mostrarMunicipios(municipios,input)
    }

    cargarMunicipioSeleccionado(id,input){
        console.log("Municipio ID: "+id)
        const municipio = this.modelo.getMunicipioPorId(id)
        this.modelo.setMunOrigen(municipio,input)
        console.log(municipio)
        this.vista.setMunicipioInput(municipio,input)
    }

    busquedaAStar(origen,destino){
        this.pintarTodasLineas();
        console.log(origen)
        console.log(destino)
        const nodosRutaCorta = this.modelo.busquedaAStar(origen,destino)
        console.log(nodosRutaCorta)
        this.vista.mostrarNodosAStar(nodosRutaCorta)
        this.vista.agregarMarcadores(nodosRutaCorta)
        this.vista.agregarLineas(nodosRutaCorta)
    }

    pintarTodasLineas(){
        const municipios = this.modelo.getTodosMunicipios()
        this.vista.pintarTodasLineas(municipios)
    }
}