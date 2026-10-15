
import { usuarioRepository } from "../repositories/usuarioRepository";

function validarRegistro(usuario){
    if(!usuario.nombre || usuario.nombre.trim()=== ""){
        throw new Error("El nombre es obligatorio")
    }
}

export const usuarioService={
    obtenerTodos:function(){
        return usuarioRepository.obtenerTodos();
    },
    crear: function(usuario){
        validarRegistro(usuario);
        return usuarioRepository.crear(usuario);
    },
    eliminar: function (usuarioID){
        return usuarioRepository.eliminar(usuarioID);
    },
    actualizar:function(usuario){
        validarRegistro(usuario);
        return usuarioRepository.actualizar(usuario);
    }
}