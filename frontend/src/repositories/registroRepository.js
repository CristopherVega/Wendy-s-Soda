const URL_API= import.meta.env.VITE_URL_API_REGISTROS || "http://localhost:3000/api/registros"

async function manejarRespuesta(respuesta) {
    let datos= null;
    try {
         datos= await respuesta.json()
    } catch (error) {
        datos = null
    }

    if(!respuesta.ok){
        throw new Error((datos && datos.mensaje || "Ocurrio un error en el servidor"))

    }

    return datos;
}

export const registroRepository={
    obtenerTodos: function(){
        return fetch(URL_API).then(manejarRespuesta);
    },
    crear:function(registro){
        return fetch(URL_API, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(registro)
        }).then(manejarRespuesta)
    }, eliminar:function(id){
        return fetch(`${URL_API}/${id}`,{
            method:"DELETE"
        }).then(manejarRespuesta)
    },
    editar:function(id, registro){
        return fetch(`${URL_API}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registro)
        }).then(manejarRespuesta)
    }
}