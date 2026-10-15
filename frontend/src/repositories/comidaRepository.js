const URL_API = import.meta.env.VITE_URL_API_COMIDA || "http://localhost:3000/api/comida";

async function manejarRespuesta(respuesta) {
    let datos= null;
    try {
        datos= await respuesta.json();
    } catch (error) {
        datos=null
    }

    if(!respuesta.ok){
        throw new Error((datos && datos.mensaje || "Ocurrio un error en el servidor"))

    }

    return datos;
}

export const comidaRepository={
    obtenerTodos: function(){
        return fetch(URL_API).then(manejarRespuesta);
    },
    crear:function(comida){
        return fetch(URL_API,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(comida)
        }).then(manejarRespuesta)
    },
    eliminar: function(id){
        return fetch(`${URL_API}/${id}`, {
            method:"DELETE"
        }).then(manejarRespuesta);
    },
    editar: function(id, comida){
        return fetch(`${URL_API}/${id}`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comida)
        }).then(manejarRespuesta);
    }
}