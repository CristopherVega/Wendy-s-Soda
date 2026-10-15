import { registroRepository } from "../repositories/registroRepository";

function validarRegistro(registro){
    if(!registro.usuarioID){
        throw new Error("La persona es obligatoria")
    }
    if(!registro.cobroID){
        throw new Error("El cobro es obligatorio")
    }
    if(!registro.tipoComidaID){
        throw new Error("La comida es obligatoria")
    }
    if(!registro.fecha){
        throw new Error("La fecha es obligatoria")
    }
}

export const registroService = {
    obtenerTodos: function(){
        return registroRepository.obtenerTodos();
    },
    crear: function(registro){
        validarRegistro(registro);
        return registroRepository.crear(registro);
    },
    eliminar: function(id){
        return registroRepository.eliminar(id);
    }
}