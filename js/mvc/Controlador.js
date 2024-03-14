class Controlador {
    
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.rutaCortaDijkstra = undefined;
        this.rutaCortaAStar = undefined;
    }

    cargarMunicipios(iniciales,input){
        const municipios = this.modelo.buscarMunicipios(iniciales)
        this.vista.mostrarMunicipios(municipios,input)
    }

    cargarTodosMunicipios(input){
        const municipios = this.modelo.getTodosMunicipiosSinSeleccionado()
        this.vista.mostrarMunicipios(municipios,input)
    }

    cargarMunicipioSeleccionado(id,input){
        console.log("Municipio ID: "+id)
        const municipio = this.modelo.getMunicipioPorId(id)
        this.modelo.setMunOrigen(municipio,input)
        console.log(municipio)
        this.vista.setMunicipioInput(municipio,input)
    }
    async mostrarMarcadores(){
        await this.vista.initMap()
        let listaNodos = this.modelo.getTodosMunicipios()
        await this.vista.agregarMarcadores(listaNodos)
        await this.vista.pintarTodasLineas(listaNodos)
    }

    busquedaAStar(origen,destino){
        const nodosRutaCorta = this.modelo.busquedaAStar(origen,destino)
        this.rutaCortaAStar = nodosRutaCorta
        this.vista.mostrarNodosAStar(nodosRutaCorta)
        //this.vista.agregarMarcadoresRutaCorta(nodosRutaCorta)
        // this.pintarTodasLineas(nodosRutaCorta)
        // this.vista.agregarLineasRutaCorta(nodosRutaCorta, 'A*')
        
    }
    
    busquedaDijkstra(origen, destino) {
        const nodosRutaCorta = this.modelo.busquedaDijkstra(origen, destino)
        console.log("Distancia Dijkstra "+nodosRutaCorta.distancia)
        
        let rutaCortaDijkstra = []
        nodosRutaCorta.ruta.forEach((nombre) => {
            let nodo = this.modelo.getMunicipioPorNombre(nombre)
            rutaCortaDijkstra.push(nodo)
        })
        this.rutaCortaDijkstra = rutaCortaDijkstra
        this.vista.mostrarNodosDijkstra(rutaCortaDijkstra);
        // this.pintarTodasLineas(rutaCortaDijkstra);
        // this.vista.agregarLineasRutaCorta(rutaCortaDijkstra, 'Dijkstra')
      }

    pintarRuta(algortimo){
        if (algortimo === 'AStar'){
            this.vista.agregarLineasRutaCorta(this.rutaCortaAStar, 'A*');
        } else {
            this.vista.agregarLineasRutaCorta(this.rutaCortaDijkstra, 'Dijkstra');
        }
    }

    pintarTodasLineas(nodosRutaCorta){
        const municipios = this.modelo.getTodosMunicipios()
        this.vista.pintarTodasLineas(municipios,nodosRutaCorta)
    }
}
