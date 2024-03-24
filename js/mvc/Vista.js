
class Vista {
    constructor() {
      this.inputOrigen = document.querySelector('.inputOrigen')
      this.inputDestino = document.querySelector('.inputDestino')
      this.divOrigen = document.querySelector('.origen')
      this.divDestino = document.querySelector('.destino')
      this.divListaOrigen = document.createElement('div')
      this.divListaDestino = document.createElement('div')
      this.nodosAStar = document.querySelector('.nodosAStar')
      this.nodoDijkstra = document.querySelector('.nodosDijkstra')
      this.nodosBellmanFord = document.querySelector('.nodosBellmanFord')
      this.mapa;
    //   this.initMap()
      this.marcadores = []
      this.caminoRutaCorta = null
      this.listaPaths = []
      this.isGrafoPintado = false
    }
  
    ocultarMunicipios() {
      // this.divOrigen.classList.add('listaOcultaOrigen')
      // this.divDestino.classList.add('listaOcultaDestino')
      const listaOrigen = document.querySelector('.listaMunicipiosOrigen')
      const listaDestino = document.querySelector('.listaMunicipiosDestino')
  
      if (listaOrigen) {
        listaOrigen.classList.add('listaOcultaOrigen')
      }
  
      if (listaDestino) {
        listaDestino.classList.add('listaOcultaDestino')
      }
    }
  
    mostrarMunicipios(municipios, input) {
  
      this.divListaOrigen.innerHTML = ``
      this.divListaDestino.innerHTML = ``
  
      this.divListaOrigen.classList.remove('listaOcultaOrigen')
      this.divListaDestino.classList.remove('listaOcultaDestino')
  
      municipios.forEach(municipio => {
        if (input == 'origen') {
          this.divListaOrigen.classList.add('listaMunicipiosOrigen')
          // divListaOrigen.classList.add('listaOcultaOrigen')
          this.divListaOrigen.classList.add('listaMunicipios')
          this.divListaOrigen.innerHTML += `<li key=${municipio.getId()} class="elementMunicipio">${municipio.getNombre()}</li>`
          this.divOrigen.appendChild(this.divListaOrigen)
        }
        if (input == 'destino') {
  
          this.divListaDestino.classList.add('listaMunicipiosDestino')
          // divListaDestino.classList.add('listaOcultaDestino')
          this.divListaDestino.classList.add('listaMunicipios')
          this.divListaDestino.innerHTML += `<li key=${municipio.getId()} class="elementMunicipio">${municipio.getNombre()}</li>`
          this.divDestino.appendChild(this.divListaDestino)
        }
      });
    }
  
    setMunicipioInput(municipio, input) {
      console.log(`Cambiando input: ${input}`)
      if (municipio) {
        if (input === 'origen') {
          this.inputOrigen.value = municipio.getNombre()
        }
        else if (input === 'destino') {
          this.inputDestino.value = municipio.getNombre()
        }
      }
    }

    limpiarMapa(){
      if (this.caminoRutaCorta) {
        this.caminoRutaCorta.setMap(null)
      }
      if(this.listaPaths.length>0){
        this.listaPaths.forEach((path)=>{
          path.setMap(null)
        })
      }
    }

    limpiarNodos(){
      this.nodoDijkstra.innerHTML = ''
      this.nodosAStar.innerHTML = ''
      this.nodosBellmanFord.innerHTML = ''
    }
  
    mostrarNodosAStar(nodos) {
      this.nodosAStar.innerHTML = ``;
      nodos.forEach((nodo) => {
        console.log("pintando")
        this.nodosAStar.innerHTML += `
                  <span class="nodo">${nodo.getNombre().split('').slice(0, 3).join('')}</span>
              `
      })
    }
    
    mostrarNodosDijkstra(nodos) {
      this.nodoDijkstra.innerHTML = ``;
      nodos.forEach((nodo) => {
        console.log("pintando")
        this.nodoDijkstra.innerHTML += `
        <span class="nodo">${nodo.getNombre().split('').slice(0, 3).join('')}</span>
        `
      })
    }
    
    mostrarNodosBellmanFord(nodos) {
      this.nodosBellmanFord.innerHTML = ``;
      nodos.forEach((nodo) => {
        console.log("pintando")
        this.nodosBellmanFord.innerHTML += `
                  <span class="nodo">${nodo.getNombre().split('').slice(0, 3).join('')}</span>
              `
      })
    }

    async agregarLineasArbolKruskal(listaNodos){
      let color = '#FFFF00';

      this.limpiarMapa()

      listaNodos.forEach((nodo) => {
        let path = []
        path.push({
          lat: nodo.nodoA.getLatitud(),
          lng: nodo.nodoA.getLongitud()
        })

        path.push({
          lat: nodo.nodoB.getLatitud(),
          lng: nodo.nodoB.getLongitud()
        })

        const flightPath = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: color,
          strokeOpacity: 1.0,
          strokeWeight: 4,
        });
        flightPath.setMap(this.mapa)
        this.listaPaths.push(flightPath)
      })
    }
  
    async agregarLineasRutaCorta(listaNodos, algoritmo) {
    
        let color = undefined
        if (algoritmo == 'A*') {
          color = "#FF0000";
        }
        else if(algoritmo == 'Bellman'){
          color = "#FFFF00"
        }
        else{
          color = "#FFFFFF"
        }
    
        this.limpiarMapa()
    
        let path = []
        listaNodos.forEach((nodo) => {
            path.push({
            lat: nodo.getLatitud(),
            lng: nodo.getLongitud()
            })
        })
        const flightPath = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });
        flightPath.setMap(null);
        flightPath.setMap(this.mapa)
        this.caminoRutaCorta = flightPath;
    }
  
    async pintarTodasLineas(listaNodos) {
        let nodoVisitado = [];
        listaNodos.forEach((nodo) => {
            nodo.getVecinos().forEach((vecino) => {
                let path = []
                if (!nodoVisitado.includes(vecino)) {
                    path.push({ lat: nodo.getLatitud(), lng: nodo.getLongitud() })
                    path.push({ lat: vecino.getLatitud(), lng: vecino.getLongitud() })
                    const flightPath = new google.maps.Polyline({
                        path: path,
                        geodesic: true,
                        strokeColor: "#40b4f7",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    });
                    flightPath.setMap(this.mapa);
                    nodoVisitado.push(nodo);
                }
            })
        })
    }
  
    async agregarMarcadores(listaNodos) {
      for (let i = 0; i < this.marcadores.length; i++) {
        this.marcadores[i].setMap(null);
      }
      // this.mapa.setMap(null)
      const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
  
      listaNodos.forEach((nodo) => {
        const position = { lat: nodo.getLatitud(), lng: nodo.getLongitud() };
        const marker = new AdvancedMarkerView({
          position: position,
          title: nodo.getNombre(),
        });
        marker.setMap(this.mapa)
        this.marcadores.push(marker)
      })
    }
  
    async initMap() {
      // The location of Uluru
      //   4.711044598083734, -74.07305123559138 -> Bogota
      const position = { lat: 4.211044598083734, lng: -74.07305123559138 };
      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
  
      // The map, centered at Uluru
      this.mapa = new Map(document.getElementById("map"), {
        zoom: 6.7,
        center: position,
        mapId: "DEMO_MAP_ID",
      });
    }
  }