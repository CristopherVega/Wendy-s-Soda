const URL_API = import.meta.env.VITE_URL_API_CUENTA || "http://localhost:3000/api/cuentas"

async function manejarRespuesta(respuesta) {
    let datos = null;
    try {
        datos = await respuesta.json();

    } catch (error) {
        datos = null
    }

    if (!respuesta.ok) {
        throw new Error((datos && datos.mensaje || "Ocurrio un error en el servidor"))

    }
    return datos;
}

export const cuentaRepository = {
    obtenerTodos: function () {
        return fetch(URL_API).then(manejarRespuesta)
    },
    crear: function (cuenta) {
        return fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(cuenta)
        }).then(manejarRespuesta)
    },
    eliminar: function(id){
        return fetch(`${URL_API}/${id}`, {
            method:"DELETE"
        }).then(manejarRespuesta);
    }
}