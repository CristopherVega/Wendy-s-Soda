import { tipoCobroRepository } from "../repositories/TipoCobroRepository";

export const tipoCobroService={
    obtenerTodos: function(){
        return tipoCobroRepository.obtenerTodos();
    },
    crear: function(tipo){
        return tipoCobroRepository.crear(tipo);
    },
    eliminar:function(id){
        return tipoCobroRepository.eliminar(id);
    }
}