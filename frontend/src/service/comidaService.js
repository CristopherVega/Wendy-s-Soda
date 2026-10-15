import { comidaRepository } from "../repositories/comidaRepository";

function validarRegistro(comida){
    if(!comida.nombre || comida.nombre.trim()===""){
        throw new Error("el nombre es obligatorio")
    }
}

export const comidaService={
    obtenerTodos: function(){
        return comidaRepository.obtenerTodos();
    },
    crear: function(comida){
        validarRegistro(comida);
        return comidaRepository.crear(comida);
    },
    eliminar: function(id){
        return comidaRepository.eliminar(id)
    },
    editar: function(id, comida){
        return comidaRepository.editar(id, comida)
    }
}