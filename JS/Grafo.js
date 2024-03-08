class Grafo {
    constructor() {
        this.nodos = []; 
        this.agregarNodo();
        
        console.log('Distancia por Erick: ');
        this.getDistance(this.nodos[4].getLatitud, this.nodos[4].getLongitud, this.nodos[9].getLatitud, this.nodos[9].getLongitud);
    }

    // Agregar un municipio al grafo
    agregarNodo() {
        this.nodos.push(new Municipio('Rioacha', 11.5384151, -72.9167838));
        this.nodos.push(new Municipio('Cienaga', 11.007984, -74.248926));
        this.nodos.push(new Municipio('Chimichagua', 9.2580323, -73.8142384));
        this.nodos.push(new Municipio('Apartado', 7.882761, -76.624692));
        this.nodos.push(new Municipio('Cucuta', 7.8890971, -72.4966896));
        this.nodos.push(new Municipio('Guatape', 6.2337643, -75.1592213));
        this.nodos.push(new Municipio('Duitama', 5.8268951, -73.0329273));
        this.nodos.push(new Municipio('Istmina', 4.5249941, -76.9182097));
        this.nodos.push(new Municipio('Libano', 4.9224602, -75.0642244));
        this.nodos.push(new Municipio('Trinidad', 5.4077975, -71.6613672));
        this.nodos.push(new Municipio('Arebe', 4.76669, -68.49993));
        this.nodos.push(new Municipio('Villavieja', 3.2207713, -75.2188977));
        this.nodos.push(new Municipio('Guarrojo', 4.2439, -70.9177));
        this.nodos.push(new Municipio('Villaviencio', 4.1491688, -73.6285475));
        this.nodos.push(new Municipio('Mavicure', 3.47108, -67.96666));
        this.nodos.push(new Municipio('Pasto', 1.2058837, -77.285787));
        this.nodos.push(new Municipio('Atenas', 4.570868, -74.297333));
        this.nodos.push(new Municipio('Tolima B', -1.53328, -71.96663));
        this.nodos.push(new Municipio('Turapaca', 4.570868, -74.297333));
        this.nodos.push(new Municipio('Pucaron', 0.87723, -71.01769));
    }
    //medir distancia
    getDistance (latitudOrigen, longitudOrigen, latitudDestino, longitudDestino) {
        let theta = origen.getLongitud() - destino.getLongitud();
        let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(origen.getLatitud() * (Math.PI/180)) * Math.sin(destino.getLatitud() * (Math. PI/180)) + 
        Math.cos(origen.getLatitud() * (Math.PI/180)) * Math.cos(destino.getLatitud() * (Math.PI/180)) * Math.cos(theta * (Math.PI/180)));
        console.log( Math.round(distance * 1.609344, 2));
    }
}