class Modelo {
    constructor() {
        this.grafo = new Grafo();
        this.munOrigen = null
        this.munDestino = null
    }
    //Algoritmo A*
    busquedaAStar(origen, destino){
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
                console.log(`Cantidad vecinos nodo: ${munActual.getNombre() } ${munActual.getVecinos().length}}`)
                if(!rutaCorta.includes(municipioVecino)){
                    distanciaEntreNodos = this.grafo.getDistance(munActual, municipioVecino);
                    let distanciaVecinoADestino=0

                    if(municipioVecino!=munDestino){
                        distanciaVecinoADestino = this.grafo.getDistance(municipioVecino,munDestino)
                    }
                    const distancia = distanciaAcumulada + distanciaEntreNodos + distanciaVecinoADestino

                    console.log('------------------------------------------------------')
                    // console.log("Mun seleccionados "+JSON.stringify(rutaCorta))
                    console.log("Distancia acumulada: "+distanciaAcumulada)
                    console.log(`Distancia entre ${munActual.getNombre()} y ${municipioVecino.getNombre()} : ${distanciaEntreNodos}`)
                    console.log(`Distancia entre ${municipioVecino.getNombre()} y ${munDestino.getNombre()}: ${distanciaVecinoADestino}`)
                    console.log(`Distancia total: ${distancia}`)
                    console.log('------------------------------------------------------')
                    
                    // Actualizar la distancia mínima y el vecino más cercano si se encuentra una distancia menor
                    if (distancia < distanciaMinima) {
                        distanciaMinima = distancia;
                        vecinoMasCercano = municipioVecino;
                    }
                }
            })
            distanciaAcumulada += distanciaEntreNodos;
            console.log("Vecino más cercano : "+JSON.stringify(vecinoMasCercano.getNombre()))
            munActual=vecinoMasCercano;
        }
        rutaCorta.push(munDestino)
        console.log('Distancia AStar'+distanciaAcumulada)
        return rutaCorta
    }

      // Esta función nos retorna el nodo con menor peso al que podemos acceder.
  nodoPesoMenor(pesos, procesados) {
    return Object.keys(pesos).reduce((menor, nodo) => {
      if (menor === null || pesos[nodo] < pesos[menor]) {
        if (!procesados.includes(nodo)) {
          menor = nodo;
        }
      }
      return menor;
    }, null);
  };


  log(mensaje) {
    const imprime = false;

    if (imprime) {
      console.log(mensaje);
    }
  }
  //Algoritmo Dijkstra
  busquedaDijkstra(origen, destino) {
    const munOrigen = this.getMunicipioPorNombre(origen)
    const munDestino = this.getMunicipioPorNombre(destino)

    let pesos = {}
    pesos[munDestino.getNombre()] = "Infinity"
    munOrigen.getVecinos().forEach((vecino) => {
      pesos[vecino.getNombre()] = this.grafo.getDistance(munOrigen, vecino)
    })

    // Siguiendo los caminos / rutas al visitar cada nodo.
    const nodosPadre = {
      nodoFinal: null
    };

    for (let nodoHijo of munOrigen.getVecinos()) {
      nodosPadre[nodoHijo.getNombre()] = munOrigen.getNombre();
    }

    // Almacenando a los nodos que ya han sido procesados.
    const procesados = [];

    let nodo = this.nodoPesoMenor(pesos, procesados);

    while (nodo) {
      let peso = pesos[this.getMunicipioPorNombre(nodo).getNombre()];
      let nodosHijo = this.getMunicipioPorNombre(nodo).getVecinos();
      //console.log(nodosHijo)

      for (let n of nodosHijo) {
        if (String(n.getNombre()) === String(munOrigen.getNombre())) {
          this.log("¡No podemos regresar al inicio!");
        } else {
          this.log("Nombre del nodo inicial: " + munOrigen.getNombre());
          this.log("Evaluando el peso hasta el nodo " + n.getNombre() + " (buscando desde el nodo " + this.getMunicipioPorNombre(nodo).getNombre() + ")");
          this.log("Último peso: " + pesos[n.getNombre()]);

          let nuevoPeso = peso + this.grafo.getDistance(this.getMunicipioPorNombre(nodo), n);

          this.log("Nuevo peso: " + nuevoPeso);

          if (!pesos[n.getNombre()] || pesos[n.getNombre()] > nuevoPeso) {
            pesos[n.getNombre()] = nuevoPeso;
            nodosPadre[n.getNombre()] = this.getMunicipioPorNombre(nodo).getNombre();;

            this.log("Nodos padre y pesos actualizados.");
          } else {
            this.log("Ya existe una mejor ruta.");
          }
        }
      }

      procesados.push(this.getMunicipioPorNombre(nodo).getNombre());
      nodo = this.nodoPesoMenor(pesos, procesados);
    }
    let rutaOptima = [munDestino.getNombre()];
    let nodoPadre = nodosPadre[munDestino.getNombre()];

    while (nodoPadre) {
      rutaOptima.push(nodoPadre);
      nodoPadre = nodosPadre[nodoPadre];
    }

    rutaOptima.reverse();

    const resultados = {
      distancia: pesos[munDestino.getNombre()],
      ruta: rutaOptima
    };

    console.log(resultados)

    return resultados;
  }

    getTodosMunicipios(){
        return this.grafo.getNodos();
    }

    getTodosMunicipiosSinSeleccionado(){
        const municipiosFiltrados = this.grafo.getNodos().filter(municipio => this.munDestino != municipio.getId() && this.munOrigen!=municipio.getId());
        return municipiosFiltrados;
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
                return;
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