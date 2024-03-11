class Municipio {
    constructor(id, nombre, latitud, longitud, vecinos) {
        this.id = id;
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.vecinos = vecinos;
        this.distancia = Infinity
        this.padre = null
    }
    //Getters
    getLongitud() {
        return this.longitud;
    }
    getLatitud() {
        return this.latitud;
    }
    setVecinos(vecinos) {
        this.vecinos = vecinos;
    }
    getVecinos() {
        return this.vecinos;
    }
    getNombre(){
        return this.nombre;
    }
    getId(){
        return this.id;
    }
    
    getDistancia(){
        return this.distancia
    }

    setDistancia(distancia){
        this.distancia=distancia;
    }

    getPadre(){
        return this.padre
    }

    setPadre(padre){
        this.padre=padre;
    }
}