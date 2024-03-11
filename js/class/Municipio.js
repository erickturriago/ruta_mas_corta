class Municipio {
    constructor(id, nombre, latitud, longitud, vecinos) {
        this.id = id;
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.vecinos = vecinos;
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
        return this.vecinos[this.getId()];
    }

    getNombre(){
        return this.nombre;
    }

    getId(){
        return this.id;
    }
    
}