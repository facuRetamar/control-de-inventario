const nombre = document.querySelector("#nombre-item")
const cantidad = document.querySelector("#numero-inicial")
const listaItem = document.querySelector(".lista-items")
const submit = document.querySelector(".submit")
const lista = document.querySelector(".lista-items")
const nombreItem= document.querySelector(".nombre-item")

itemArray = []

//actualiza la lista de items al refrescar la pagina
document.addEventListener("DOMContentLoaded", ()=>{
    if(itemArray = JSON.parse(localStorage.getItem("itemNuevo"))){
    plasmarHTML()
    }else{
        return
    }
})

//registra un nuevo item
submit.addEventListener("click", (e)=>{
    e.preventDefault()
    registrar()
})

//creacion de la clase
class DivItem {
    constructor(nombre,cantidad){
    this.nombre = nombre
    this.cantidad = cantidad
    }

}


function registrar(){
    //validacion para registrar un nuevo item
    if(nombre.value === ""){
        imprimirAlerta("no se puede dejar el nombre vacio")
        return
    }else if(isNaN(cantidad.value) || cantidad.value<= 0){
        imprimirAlerta("la cantidad debe ser un numero y mayor a cero")
        return
    }else if(cantidad.value.includes(".") ){
        imprimirAlerta("la cantidad no puede ser decimal")
        cantidad.value = ""
        return
    }

    
    let nombreItem = nombre.value
    let cantidadInicial = cantidad.value

    let item = {
        nombre: nombreItem,
        cantidad: cantidadInicial
    }
    //guardado en array y local storage
    itemArray.push(item)
    guardarEnLocal()
    
    plasmarHTML()
    nombre.value=""
    cantidad.value=""
}


function guardarEnLocal(){
    localStorage.setItem("itemNuevo", JSON.stringify(itemArray))
    plasmarHTML()
}



function plasmarHTML(){

    limpiarHTML()
    
   
    //DOM scripting con todos los datos recabados
    let itemAPlasmar = JSON.parse(localStorage.getItem("itemNuevo")) 
    itemAPlasmar.forEach(item => {
        item =  new DivItem (item.nombre, item.cantidad)
        const divContainer = document.createElement("div")
        divContainer.classList.add("div-contenedor_item")
        const nombrePuesto = document.createElement("p")
        const cantidadInicial = document.createElement("p")
        const inputNuevo = document.createElement("input")
        const botonSuma = document.createElement("button")
        const botonResta = document.createElement("button")
        const botonBorrar = document.createElement("button")
        const divBotones = document.createElement("div")
        const divNumero = document.createElement("div")
        divNumero.innerHTML = `stock disponible: `
        divNumero.classList.add("div-numero")
        inputNuevo.classList.add("cantidad-nueva")
        divBotones.classList.add("div-botones")
        botonBorrar.classList.add("boton-borrar")
        botonBorrar.innerHTML = `<span class="material-icons-outlined">
        delete
        </span>`
        botonSuma.classList.add("sumar-boton")
        botonSuma.innerHTML = "+"
        nombrePuesto.classList.add("nombre-puesto")
        cantidadInicial.classList.add("cantidad-inicial")
        botonResta.classList.add("restar-boton")
        botonResta.innerHTML = "-"
        nombrePuesto.innerHTML=`${item.nombre}`
        cantidadInicial.innerHTML=`${item.cantidad}`
        divNumero.append(cantidadInicial)
        divBotones.append(inputNuevo,botonSuma,botonResta,botonBorrar)
        divContainer.append(nombrePuesto,divNumero,divBotones )
        lista.append(divContainer)

        //funcionalidad a los botones creados dentro de cada div
        botonSuma.addEventListener("click", e=>{
            
            cantidadInicial.innerHTML = Number(inputNuevo.value) + Number(cantidadInicial.innerHTML)
            
            
            let aCambiar = e.path[2].childNodes[0].innerHTML
               
              
            let indexTerminado = itemArray.findIndex(elemento => elemento.nombre == aCambiar );
            
            
           
            itemArray[indexTerminado].cantidad = cantidadInicial.textContent
            guardarEnLocal()
            
            
            inputNuevo.value = ""
   
           })

        botonResta.addEventListener("click", e=>{
           
            if(Number(inputNuevo.value) > Number(cantidadInicial.innerHTML)){
                imprimirAlerta("no puedes vender mas de lo que tienes disponible en stock")
             return
         }
         cantidadInicial.textContent =  Number(cantidadInicial.innerHTML)  - Number(inputNuevo.value)

         
    
         let aCambiar = e.path[2].childNodes[0].innerHTML
            
           
         let indexTerminado = itemArray.findIndex(elemento => elemento.nombre == aCambiar );
       
         
        
         itemArray[indexTerminado].cantidad = cantidadInicial.textContent
         

         guardarEnLocal()
         
         inputNuevo.value = ""
     
         
        })
        botonBorrar.addEventListener("click", e=>{
            
            
            let ABorrar = e.path[3].childNodes[0].textContent
            
           
            let indexTerminado = itemArray.findIndex(elemento => elemento.nombre == ABorrar );
            
            itemArray.splice(indexTerminado, 1)
            guardarEnLocal()

            
        })



    });

}

//alertas para la validacion 
function imprimirAlerta(mensaje){
    const divMensaje = document.createElement("div")
    divMensaje.classList.add("alerta")
    divMensaje.textContent = mensaje
    document.querySelector(".nombre").insertBefore(divMensaje, nombreItem )
    setTimeout( ()=>{

        divMensaje.remove()
    }  , 3000 )
}


function limpiarHTML(){
    lista.innerHTML = ""
}