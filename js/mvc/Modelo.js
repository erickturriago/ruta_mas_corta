class Modelo {
    constructor() {
        this.grafo = new Grafo();
        this.munOrigen = null
        this.munDestino = null
    }
    //Algoritmo A*
    busquedaAStar(origen, destino){
        console.log(origen)
        console.log(destino)
        const munOrigen = this.getMunicipioPorNombre(origen)
        const munDestino = this.getMunicipioPorNombre(destino)

        // console.log(munOrigen)
        // console.log(munDestino)

        let rutaCorta = []
        let munActual = munOrigen
        let distanciaAcumulada = 0
        let distanciaEntreNodos = 0

        while(munActual!=munDestino){
            
            rutaCorta.push(munActual)

            // Variable para almacenar la distancia mínima entre vecinos
            let distanciaMinima = Infinity;
            let vecinoMasCercano = null;

            // Iterar sobre los vecinos del municipio actual para encontrar el más cercano
            munActual.getVecinos().forEach((municipioVecino)=>{
                const vecino = this.getMunicipioPorId(municipioVecino);
                
                if(!rutaCorta.includes(vecino)){
                    distanciaEntreNodos = this.grafo.getDistance(munActual, vecino);
                    let distanciaVecinoADestino=0
                    if(vecino!=munDestino){
                        distanciaVecinoADestino = this.grafo.getDistance(vecino,munDestino)
                    }
                    const distancia = distanciaAcumulada + distanciaEntreNodos + distanciaVecinoADestino

                    console.log('------------------------------------------------------')
                    console.log("Mun seleccionados "+JSON.stringify(rutaCorta))
                    console.log("Distancia acumulada: "+distanciaAcumulada)
                    console.log(`Distancia entre ${munActual.getNombre()} y ${vecino.getNombre()} : ${distanciaEntreNodos}`)
                    console.log(`Distancia entre ${vecino.getNombre()} y ${munDestino.getNombre()}: ${distanciaVecinoADestino}`)
                    console.log(`Distancia total: ${distancia}`)
                    console.log('------------------------------------------------------')
                    
                    // Actualizar la distancia mínima y el vecino más cercano si se encuentra una distancia menor
                    if (distancia < distanciaMinima) {
                        distanciaMinima = distancia;
                        vecinoMasCercano = vecino;
                    }
                }
            })
            distanciaAcumulada += distanciaEntreNodos;
            console.log("Vecino más cercano : "+JSON.stringify(vecinoMasCercano))
            munActual=vecinoMasCercano;
        }
        rutaCorta.push(munDestino)
        console.log(distanciaAcumulada)
        return rutaCorta
    }

    //Algoritmo Dijkstra
    busquedaDijkstra(origen, destino) {
        
    }

    getTodosMunicipios(){
        const municipiosFiltrados = this.grafo.getNodos().filter(municipio => this.munDestino != municipio.getId() && this.munOrigen!=municipio.getId());
        return municipiosFiltrados
    }

    buscarMunicipios(iniciales){
        const inicialesTrimmed = iniciales.trim();
        const municipiosFiltrados = this.grafo.getNodos().filter(municipio => municipio.getNombre().toLowerCase().startsWith(inicialesTrimmed.toLowerCase()) && this.munDestino!= municipio.getId() && this.munOrigen!=municipio.getId());
        console.log(municipiosFiltrados)
        return municipiosFiltrados;
    }

    getMunicipioPorId(id){
        let municipioBuscado = null
        this.grafo.getNodos().forEach((municipio)=>{
            if((id+"") == (municipio.getId()+"")){
                municipioBuscado = municipio;
                return
            }
        })
        return municipioBuscado;
    }

    getMunicipioPorNombre(nombre){
        let municipioBuscado = null
        this.grafo.getNodos().forEach((municipio)=>{
            if((nombre+"") == (municipio.getNombre()+"")){
                municipioBuscado = municipio;
                return
            }
        })
        return municipioBuscado;
    }

    setMunOrigen(municipio,input){
        if(input=='origen'){
            this.munOrigen=municipio.getId();
        }
        else if(input=='destino'){
            this.munDestino=municipio.getId();
        }

    }


}