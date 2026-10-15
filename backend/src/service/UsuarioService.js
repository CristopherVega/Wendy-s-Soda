const {AppDataSource}= require("../config/data-source");
const usuarioEntity= require("../entities/UsuarioEntity");

function mapearUsuarios(usuario){
    return{
        id:usuario.usuarioID,
        nombre: usuario.nombre
    }
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(usuarioEntity);
    const usuario= await repo.find({
        order:{usuarioID:"ASC"}
    })

    return usuario.map(mapearUsuarios);
}

async function crear(usuario) {
    const repo= AppDataSource.getRepository(usuarioEntity);
    const nuevo= repo.create(usuario);
    const guardado= await repo.save(nuevo);

    return mapearUsuarios(guardado);
}

async function eliminar(id) {
    const repo= AppDataSource.getRepository(usuarioEntity);
    const resultado= await repo.delete({usuarioID:id});

    if(resultado===0){
        throw new Error("Usuario no encontrado");
    }
}


module.exports={obtenerTodos,crear, eliminar};


