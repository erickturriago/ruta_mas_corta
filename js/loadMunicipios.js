const divOrigen = document.querySelector('.origen')
const divDestino = document.querySelector('.destino')

const inputOrigen = document.querySelector('.inputOrigen')
const inputDestino = document.querySelector('.inputDestino')


const cargarMunicipios = ()=>{
    const divListaOrigen = document.createElement('div')
    divListaOrigen.classList.add('listaMunicipiosOrigen')
    divListaOrigen.classList.add('listaOcultaOrigen')
    divListaOrigen.classList.add('listaMunicipios')

    const divListaDestino = document.createElement('div')
    divListaDestino.classList.add('listaMunicipiosDestino')
    divListaDestino.classList.add('listaOcultaDestino')
    divListaDestino.classList.add('listaMunicipios')

    const municipios = `
        <li>Rioacha</li>
        <li>Cienaga</li>
        <li>Chimichagua</li>
        <li>Apartadó</li>
        <li>Cucuta</li>
        <li>Guatapé</li>
        <li>Duitama</li>
        <li>Istmina</li>
        <li>Libano</li>
        <li>Trinidad</li>
        <li>Arebe</li>
        <li>Villavieja</li>
        <li>Guarrojo</li>
        <li>Villaviencio</li>
        <li>Mavicure</li>
        <li>Pasto</li>
        <li>Atenas</li>
        <li>Tolima B</li>
        <li>Turapaca</li>
        <li>Pucaron</li>    
    `

    divListaOrigen.innerHTML = municipios

    divListaDestino.innerHTML = municipios

    divOrigen.appendChild(divListaOrigen)
    divDestino.appendChild(divListaDestino)
}

// inputOrigen.onkeypress = (event) =>console.log("first");

inputOrigen.addEventListener("keyup", (event) => {
    let longitudInput = event.target.value.length;
    console.log(event.target.value.length)
    const listaOrigen = document.querySelector('.listaMunicipiosOrigen');
    if(longitudInput>=3){
        listaOrigen.classList.remove('listaOcultaOrigen');
    }
    else{
        if(!listaOrigen.classList.contains('listaOcultaOrigen')){
            listaOrigen.classList.add('listaOcultaOrigen');
        }
    }
    console.log("first")
  });

  inputOrigen.addEventListener("keyup", (event) => {
    let longitudInput = event.target.value.length;
    const listaOrigen = document.querySelector('.listaMunicipiosOrigen');
    if(longitudInput>=3){
        listaOrigen.classList.remove('listaOcultaOrigen');
    }
    else{
        if(!listaOrigen.classList.contains('listaOcultaOrigen')){
            listaOrigen.classList.add('listaOcultaOrigen');
        }
    }
  });

  inputDestino.addEventListener("keyup", (event) => {
    let longitudInput = event.target.value.length;
    const listaDestino = document.querySelector('.listaMunicipiosDestino');
    if(longitudInput>=3){
        listaDestino.classList.remove('listaOcultaDestino');
    }
    else{
        if(!listaDestino.classList.contains('listaOcultaDestino')){
            listaDestino.classList.add('listaOcultaDestino');
        }
    }
  });

cargarMunicipios();