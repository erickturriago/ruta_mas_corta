class Controlador {
    
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.rutaCortaDijkstra = undefined;
        this.rutaCortaAStar = undefined;
        this.rutaCortaBellmanFord = undefined;
        this.arbolKruskal = undefined
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
        // this.busquedaKruskal();
        // this.pintarRuta('Kruskal')
    }

    busquedaAStar(origen,destino){
        const nodosRutaCorta = this.modelo.busquedaAStar(origen,destino)
        this.rutaCortaAStar = nodosRutaCorta
        this.vista.mostrarNodosAStar(nodosRutaCorta)
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

    busquedaBellmanFord(origen, destino){
        const nodosRutaCorta = this.modelo.busquedaBellmanFord(origen, destino)
        this.rutaCortaBellmanFord = nodosRutaCorta;
        this.vista.mostrarNodosBellmanFord(nodosRutaCorta)
    }

    busquedaKruskal(){
        const listaAristas = this.modelo.busquedaKruskal()
        console.log(listaAristas)
        this.arbolKruskal=listaAristas;
        this.vista.agregarLineasArbolKruskal(this.arbolKruskal)
    }

    pintarRuta(algoritmo){
        if (algoritmo == 'AStar'){
            this.vista.agregarLineasRutaCorta(this.rutaCortaAStar, 'A*');
        } else if(algoritmo=='Dijkstra') {
            this.vista.agregarLineasRutaCorta(this.rutaCortaDijkstra, 'Dijkstra');
        } else if(algoritmo=='Bellman'){
            this.vista.agregarLineasRutaCorta(this.rutaCortaBellmanFord, 'Bellman');
        }
    }

    pintarTodasLineas(nodosRutaCorta){
        const municipios = this.modelo.getTodosMunicipios()
        this.vista.pintarTodasLineas(municipios,nodosRutaCorta)
    }
}
