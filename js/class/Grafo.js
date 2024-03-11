class Grafo {
    constructor() {
        this.nodos = []; 
        this.agregarNodo();
        this.listaNodosConVecinos = [
            {'id': 1, 'vecinos': [2, 3]},
            {'id': 2, 'vecinos': [1, 3, 4]},
            {'id': 3, 'vecinos': [1, 2, 4, 5, 6]},
            {'id': 4, 'vecinos': [2, 3, 5, 6, 8]},
            {'id': 5, 'vecinos': [3, 4, 6, 7]},
            {'id': 6, 'vecinos': [4, 5, 7, 8, 9]},
            {'id': 7, 'vecinos': [5, 6, 9, 10, 11]},
            {'id': 8, 'vecinos': [4, 6, 9, 12, 16]},
            {'id': 9, 'vecinos': [6, 7, 8, 10, 12, 13, 15, 16]},
            {'id': 10, 'vecinos': [7, 9, 11, 12, 13, 14, 15]},
            {'id': 11, 'vecinos': [7, 10, 13, 14, 15]},
            {'id': 12, 'vecinos': [8, 9, 10, 13, 15, 16, 17]},
            {'id': 13, 'vecinos': [9, 10, 11, 12, 14, 15, 20]},
            {'id': 14, 'vecinos': [10, 11, 13, 15, 20]},
            {'id': 15, 'vecinos': [9, 10, 12, 13, 14, 16, 17, 18, 20,11]},
            {'id': 16, 'vecinos': [8, 9, 12, 15, 17]},
            {'id': 17, 'vecinos': [12, 15, 16, 18, 20]},
            {'id': 18, 'vecinos': [15, 17, 19, 20]},
            {'id': 19, 'vecinos': [18, 20]},
            {'id': 20, 'vecinos': [14, 15, 17, 18, 19]}
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
        this.nodos.push(new Municipio(17, 'Atenas', -0.5978037658065678, -72.89221327740292));
        this.nodos.push(new Municipio(18, 'Tolima B', -1.53328, -71.96663));
        this.nodos.push(new Municipio(19, 'Turapaca', -2.8910303365332566, -69.74159706480707));
        this.nodos.push(new Municipio(20, 'Pucaron', 0.87723, -71.01769));
    }

    getNodos(){
        return this.nodos;
    }

    //Agregar vecinos a un municipio
    agregarVecinos(){
        this.listaNodosConVecinos.forEach((registro)=>{
            const nodo = this.nodos.filter((nodo)=>nodo.getId()==registro.id)
            let listaNodos =[]
            registro.vecinos.forEach((idVecino)=>{
                const vecino = this.nodos.filter((nodo)=>nodo.getId()==idVecino)
                listaNodos.push(vecino[0])
            })
            nodo[0].setVecinos(listaNodos)
            // console.log(nodo[0])
        })
    }
    //medir distancia
    getDistance (origen, destino) {
        let theta = origen.getLongitud() - destino.getLongitud();
        let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(origen.getLatitud() * (Math.PI/180)) * Math.sin(destino.getLatitud() * (Math. PI/180)) + 
        Math.cos(origen.getLatitud() * (Math.PI/180)) * Math.cos(destino.getLatitud() * (Math.PI/180)) * Math.cos(theta * (Math.PI/180)));
        // console.log(distance * 1.609344, 2 + ' Km');
        return distance*1.609344;
    }
}