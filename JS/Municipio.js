class Municipio {
    constructor(nombre, latitud, longitud) {
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        console.log(`Municipio creado: ${this.nombre}, Latitud: ${this.latitud}, Longitud: ${this.longitud}`);
    }
    //Getters
    getLongitud() {
        return this.longitud;
    }
    getLatitud() {
        return this.latitud;
    }
    // Método para agregar un vecino al municipio
    agregarVecino(municipio) {
        this.vecinos.push(municipio);
    }
}