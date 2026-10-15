const service = require("../service/RegistroService");

async function listar(req, res) {
    try {
        const data = await service.obtenerTodos();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al listar los datos", error);
        res.status(500).json({mensaje: "Ocurrio un error en el servidor" , detalle: error.message})
    }

}

async function crear(req, res) {
    try {
        const datos= await service.crear(req.body);
        res.status(201).json(datos);
    } catch (error) {
        res.status(400).json({mensaje: error.message || "Error en el servidor"})
    }
}

async function eliminar(req, res) {
    try {
        const id= Number(req.params.id);
        await service.eliminar(id);
        res.status(200).json({mensaje: "Registro eliminado"})
    } catch (error) {
       res.status(404).json({mensaje: "Error en el servidor"}) 
    }
}

async function editar(req, res) {
    try {
        const id= Number(req.params.id);
        const editado= await service.editar(id, req.body);
        res.status(200).json(editado);
    } catch (error) {
        res.status(404).json({mensaje: "Error en el servidor"})
    }
}


module.exports={listar, eliminar, crear, editar}