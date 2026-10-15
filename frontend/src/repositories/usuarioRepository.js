const URL_API= import.meta.env.VITE_URL_API_USUARIOS || "http://localhost:3000/api/usuarios";

async function manejarRespuesta(respuesta){
    let datos=null;
    try {
        datos= await respuesta.json();
    } catch (error) {
        datos=null;
    }

    if(!respuesta.ok){
        throw new Error((datos && datos.mensaje || "Ocurrio un error en el servidor"))
    }

    return datos;
}

export const  usuarioRepository={
    obtenerTodos: function(){
        return fetch(URL_API).then(manejarRespuesta);
    },
    crear:function(usuario){
        return fetch (URL_API, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(usuario)
        }).then(manejarRespuesta);
    },

    eliminar: function(usuarioID){
        return fetch (`${URL_API}/${usuarioID}`,{
            method: "DELETE"
        }).then(manejarRespuesta);
    }
}