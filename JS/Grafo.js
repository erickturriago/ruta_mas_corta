class Grafo {
    constructor() {
        this.nodos = []; 
        this.agregarNodo();
        this.vecinos = [
           {'1': [2, 3]},
           {'2': [1, 3, 4]},
           {'3': [1, 2, 4, 5, 6]},
           {'4': [2, 3, 5, 6, 8]},
           {'5': [3, 4, 6, 7]},
           {'6': [4, 5, 7, 8, 9]},
           {'7': [5, 6, 9, 10, 11]},
           {'8': [4, 6, 9, 12, 16]},
           {'9': [6, 7, 8, 10, 12, 13, 15, 16]},
           {'10': [7, 9, 11, 12, 13, 14, 15]},
           {'11': [7, 10, 13, 14]},
           {'12': [8, 9, 10, 13, 15, 16, 17]},
           {'13': [9, 10, 11, 12, 14, 15, 20]},
           {'14': [10, 11, 13, 15, 20]},
           {'15': [9, 10, 12, 13, 14, 16, 17, 18, 20]},
           {'16': [8, 9, 12, 15,  17]},
           {'17': [12, 15, 16,  18, 20]},
           {'18': [15, 17,  19, 20]},
           {'19': [18,  20]},
           {'20': [14, 15, 17, 18, 19]}
        ]
        this.agregarVecinos();
    }

    // Agregar un municipio al grafo
    agregarNodo() {
        this.nodos.push(new Municipio(1, 'Rioacha', 11.5384151, -72.9167838));
        this.nodos.push(new Municipio(2, 'Cienaga', 11.007984, -74.248926));
        this.nodos.push(new Municipio(3, 'Chimichagua', 9.2580323, -73.8142384));
        this.nodos.push(new Municipio(4, 'Apartado', 7.882761, -76.624692));
        this.nodos.push(new Municipio(5, 'Cucuta', 7.8890971, -72.4966896));
        this.nodos.push(new Municipio(6, 'Guatape', 6.2337643, -75.1592213));
        this.nodos.push(new Municipio(7, 'Duitama', 5.8268951, -73.0329273));
        this.nodos.push(new Municipio(8, 'Istmina', 4.5249941, -76.9182097));
        this.nodos.push(new Municipio(9, 'Libano', 4.9224602, -75.0642244));
        this.nodos.push(new Municipio(10, 'Trinidad', 5.4077975, -71.6613672));
        this.nodos.push(new Municipio(11, 'Arebe', 4.76669, -68.49993));
        this.nodos.push(new Municipio(12, 'Villavieja', 3.2207713, -75.2188977));
        this.nodos.push(new Municipio(13, 'Guarrojo', 4.2439, -70.9177));
        this.nodos.push(new Municipio(14, 'Villaviencio', 4.1491688, -73.6285475));
        this.nodos.push(new Municipio(15, 'Mavicure', 3.47108, -67.96666));
        this.nodos.push(new Municipio(16, 'Pasto', 1.2058837, -77.285787));
        this.nodos.push(new Municipio(17, 'Atenas', 4.570868, -74.297333));
        this.nodos.push(new Municipio(18, 'Tolima B', -1.53328, -71.96663));
        this.nodos.push(new Municipio(19, 'Turapaca', 4.570868, -74.297333));
        this.nodos.push(new Municipio(20, 'Pucaron', 0.87723, -71.01769));
    }
    //Agregar vecinos a un municipio
    agregarVecinos(){
        for(let i = 0; i < this.nodos.length; i++){
            this.nodos[i].setVecinos(this.vecinos[i]);
        }
    }
    //medir distancia
    getDistance (origen, destino) {
        let theta = origen.getLongitud() - destino.getLongitud();
        let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(origen.getLatitud() * (Math.PI/180)) * Math.sin(destino.getLatitud() * (Math. PI/180)) + 
        Math.cos(origen.getLatitud() * (Math.PI/180)) * Math.cos(destino.getLatitud() * (Math.PI/180)) * Math.cos(theta * (Math.PI/180)));
        console.log(distance * 1.609344, 2 + ' Km');
    }
    
}