import { cuentaRepository } from "../repositories/cuentaRepository";


export const cuentaService={
    obtenerTodos: function(){
        return cuentaRepository.obtenerTodos();
    },
    crear: function(cuenta){
        return cuentaRepository.crear(cuenta);
    },
    eliminar:function(id){
        return cuentaRepository.eliminar(id);
    }
}