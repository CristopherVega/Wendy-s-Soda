const {AppDataSource}= require("../config/data-source");
const tipoComidaEntity=require("../entities/TipoComida");

function mapearComida(comida){
    return{
        id:comida.tipoComidaID,
        nombre: comida.nombre,
        monto: comida.monto

    }
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(tipoComidaEntity);
    const comida= await repo.find({
        order:{tipoComidaID:"ASC"}
    })

    return comida.map(mapearComida);
}

async function crear(comida) {
    const repo= AppDataSource.getRepository(tipoComidaEntity);
    const nuevo= repo.create(comida);
    const guardado= await repo.save(nuevo);

    return mapearComida(guardado);
}

async function editar(id, comida) {
    const repo= AppDataSource.getRepository(tipoComidaEntity);
    const existente= await repo.preload({
        tipoComidaID:id,
        ...comida
    });
    if(!existente){
        throw new Error("Comida no encontrada");
    }

    const actualizado= await repo.save(existente);

    return mapearComida(actualizado);
}

async function eliminar(id) {
    const repo= AppDataSource.getRepository(tipoComidaEntity);
    const resultado=await repo.delete({tipoComidaID:id});

    if(resultado ===0){
        throw new Error("comida no encontrada ")
    }
    
}

module.exports={crear,obtenerTodos,editar, eliminar};