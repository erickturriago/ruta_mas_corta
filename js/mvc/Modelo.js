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

    // Algoritmo Bellman-Ford
    busquedaBellmanFord(origen, destino) {
      // Paso 1: Inicializar las distancias y predecesores
      let distancias = {}
      let predecesores = {}
      for (let mun of this.grafo.getNodos()) {
        distancias[mun.getNombre()] = Infinity
        predecesores[mun.getNombre()] = null
      }
      distancias[origen] = 0;

      // Paso 2 y 3: Relajación de las aristas (V-1) veces
      for (let i = 0; i < this.grafo.getNodos().length - 1; i++) {
        for (let mun of this.grafo.getNodos()) {
          for (let vecino of mun.getVecinos()) {
            let nuevaDistancia = distancias[mun.getNombre()] + this.grafo.getDistance(mun, vecino);
            if (nuevaDistancia < distancias[vecino.getNombre()]) {
              distancias[vecino.getNombre()] = nuevaDistancia;
              predecesores[vecino.getNombre()] = mun.getNombre();
            }
          }
        }
      }
      
      // Paso 4: Detección de ciclos de peso negativo
      for (let mun of this.grafo.getNodos()) {
        for (let vecino of mun.getVecinos()) {
          if (distancias[mun.getNombre()] + this.grafo.getDistance(mun, vecino) < distancias[vecino.getNombre()]) {
            console.log("El grafo contiene un ciclo de peso negativo");
            return;
          }
        }
      }
      const municipioDestino = this.getMunicipioPorNombre(destino) 
      
      let rutaCortaBellman = []
      let camino = []
      let actual = municipioDestino.getNombre()
      
      while (actual != null) {
        camino.unshift(actual)
        actual = predecesores[actual]
      }
      console.log("Distancias Bellman-Ford: ")
      for (let i = 0; i < camino.length; i++) {
        rutaCortaBellman.push(this.getMunicipioPorNombre(camino[i]))
        console.log(rutaCortaBellman[i])
      }
      
      return rutaCortaBellman
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

    busquedaKruskal(){
      let aristas = []
      let nodosVisitados = []
      let aristasElegidas = []
      let arbol = {}

      //Crear arreglo de aristas
      for(let i=0;i<this.grafo.getNodos().length;i++){
        console.log(i)
        let nodo = this.grafo.getNodos()[i]
        if(!nodosVisitados.includes(nodo)){
          for(let j=0;j<nodo.getVecinos().length;j++){
            let obj = {}
            let vecino = nodo.getVecinos()[j];
            let distancia = this.grafo.getDistance(nodo,vecino)
            obj['distancia']=distancia;
            obj['aristas'] = [{origen:nodo.getNombre(),destino:vecino.getNombre()},{origen:vecino.getNombre(),destino:nodo.getNombre()}]
            obj['nodoA'] = this.getMunicipioPorNombre(nodo.getNombre())
            obj['nodoB'] = this.getMunicipioPorNombre(vecino.getNombre())
            aristas.push(obj)
          }
        }
        nodosVisitados.push(nodo)
      }

      //Ordenar del arreglo
      let n = aristas.length
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (aristas[j].distancia > aristas[j + 1].distancia) {
                // Intercambiar elementos si están en el orden incorrecto
                const temp = aristas[j];
                aristas[j] = aristas[j + 1];
                aristas[j + 1] = temp;
            }
        }
      }
      // console.log(aristas)

      //Crear arbol, cargar nodos sin vecinos
      this.grafo.getNodos().forEach((nodo)=>{
        arbol[nodo.getNombre()]=[]
      })

      //Seleccionar aristas
      for(let i=0;i<aristas.length;i++){
        // console.log(munSeleccionados)
        let aristaActual = aristas[i]
        let origenActual = aristaActual.aristas[0].origen
        let destinoActual = aristaActual.aristas[0].destino

        console.log(`Arista de: ${origenActual} ${destinoActual}`)

        let esBucle = false
        let visitados = []
        let cola = [origenActual]

        while(cola.length>0){
          // console.log(cola)
          let elemento = cola.pop()
          visitados.push(elemento)
          if(elemento==destinoActual){
            esBucle=true
            break
          }
          arbol[elemento].forEach((nodo)=>{
            if(!visitados.includes(nodo)){
              cola.push(nodo)
            }
          })
        }

        if(!esBucle){
          aristasElegidas.push(aristaActual)
          arbol[origenActual].push(destinoActual)
          arbol[destinoActual].push(origenActual)
        }
        console.log(arbol)
      }

      // console.log(aristasElegidas)
      return aristasElegidas;
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