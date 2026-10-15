const comidaService=require("../service/TipoComidaService");

async function listar(req, res) {
    try {
        const datos= await comidaService.obtenerTodos();
        res.status(200).json(datos);
    } catch (error) {
        console.error("Error al listar los datos", error);
        res.status(500).json({mensaje: "Ocurrio un error en el servidor" , detalle: error.message})

    }

}

async function crear(req, res) {
    try {
        const datos= await comidaService.crear(req.body);
        res.status(201).json(datos);
    } catch (error) {
        res.status(400).json({mensaje: "Error en el servidor"})
    }
}

async function editar(req, res) {
    try {
        const id= Number(req.params.id);
        const editado= await comidaService.editar(id, req.body);
        res.status(200).json(editado);
    } catch (error) {
        res.status(404).json({mensaje: "Error en el servidor"})
    }
}

async function eliminar(req, res) {
    try {
        const id= Number(req.params.id);
        await comidaService.eliminar(id);
        res.status(200).json({mensaje: "Comida eliminada"});
    } catch (error) {
        res.status(404).json({mensaje: "Error en el servidoor"})
    }
}

module.exports={listar,crear,editar, eliminar}