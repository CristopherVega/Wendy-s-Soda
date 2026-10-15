const service= require("../service/CuentasService");

async function listar(req , res) {
    try {
        const datos= await service.obtenerTodos();
        res.status(200).json(datos);
    } catch (error) {
        console.error("Error al listar las cuentas", error)
        res.status(500).json({mensaje:"Ocurrio un error en el servidor"})
    }
}

async function crear(req, res) {
    try {
        const datos= await service.crear(req.body);
        res.status(201).json(datos);
    } catch (error) {
        res.status(400).json({mensaje:"Error en el servidor"})
    }
}

async function eliminar(req, res) {
    try {
        const id= Number(req.params.id);
        await service.eliminar(id);
        res.status(200).json({mensaje: "Cuenta Eliminda"})
    } catch (error) {
        res.status(404).json({mensaje: "Error en el servidor"})
    }
}
module.exports={listar,crear, eliminar}