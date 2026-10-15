const {AppDataSource} = require("../config/data-source");
const cuentaEntity = require("../entities/Cuentas");

function mapearCuenta(cuenta) {
    return {
        id: cuenta.cuentaID,
        usuarioID: cuenta.Usuario?.usuarioID,
        nombreUsuario: cuenta.Usuario?.nombre,
        saldo: cuenta.saldo
    }
}

async function obtenerTodos() {
    const repo = AppDataSource.getRepository(cuentaEntity);
    const data = await repo.find({
        relations: {Usuario: true },
        order: {cuentaID: "ASC"}
    })

    return data.map(mapearCuenta)
}

async function crear(cuenta) {
    const repo = AppDataSource.getRepository(cuentaEntity);

    const nuevo = repo.create({
        Usuario: {usuarioID: cuenta.usuarioID},
        saldo: 0
    });

    const guardado = await repo.save(nuevo);

    const conRelacion = await repo.findOne({
        where: {cuentaID: guardado.cuentaID},
        relations: { Usuario: true }
    });

    return mapearCuenta(conRelacion);
}

async function eliminar(id) {
    const repo = AppDataSource.getRepository(cuentaEntity);
    const resultado = await repo.delete({cuentaID: id});
    if (resultado.affected === 0) {
        throw new Error("Cuenta no encontrada");
    }
}

module.exports = {crear, obtenerTodos, eliminar}