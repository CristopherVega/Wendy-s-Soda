const {AppDataSource}=require("../config/data-source");
const TipoCobroEntity=require("../entities/TipoCobro");


function mapearTipoCobro(cobro){
    return{
        id:cobro.tipoCobroID,
        nombre: cobro.nombre,
        diasIntervalo:cobro.diasIntervalo
    }
    
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(TipoCobroEntity);
    const cobro= await repo.find({
        order:{tipoCobroID:"ASC"}
    });

    return cobro.map(mapearTipoCobro);

}

async function crear(cobro) {
    const repo= AppDataSource.getRepository(TipoCobroEntity);
    const nuevo=  repo.create(cobro);
    const guardado= await repo.save(nuevo);

    return mapearTipoCobro(guardado);
}

async function eliminar(id) {
    const repo= AppDataSource.getRepository(TipoCobroEntity);
    const resultado= await repo.delete({tipoCobroID:id});

    if(resultado.affected===0){
        throw new Error("no se encontro el tipo de cobro")
    }

    
}

module.exports={obtenerTodos, crear, eliminar}