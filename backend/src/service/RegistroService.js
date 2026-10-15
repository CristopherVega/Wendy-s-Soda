const {AppDataSource} = require("../config/data-source");
const registroEntity = require("../entities/Registro");
const cuentaEntity = require("../entities/Cuentas");
const cobroEntity = require("../entities/Cobro");
const tipoComidaEntity = require("../entities/TipoComida");

function mapearRegistro(registro){
    return{
        id:registro.registroID,
        usuarioID:registro.Usuario?.usuarioID,
        nombre:registro.Usuario?.nombre,
        tipoComidaID:registro.TipoComida?.tipoComidaID,
        nombreComida:registro.TipoComida?.nombre,
        cobroID:registro.Cobro?.cobroID,
        fecha: registro.fecha,
        monto:registro.monto
    }
}

async function obtenerTodos() {
    const repo = AppDataSource.getRepository(registroEntity);
    const data = await repo.find({
        relations:{Usuario:true, Cobro:true, TipoComida:true},
        order:{registroID:"ASC"}
    })
    return data.map(mapearRegistro);
}

async function crear(registro) {
    return await AppDataSource.transaction(async (manager) => {
        const repoRegistro = manager.getRepository(registroEntity);
        const repoCuenta = manager.getRepository(cuentaEntity);
        const repoTipoComida = manager.getRepository(tipoComidaEntity);
        const repoCobro = manager.getRepository(cobroEntity);

        const tipoComida = await repoTipoComida.findOne({
            where: { tipoComidaID: registro.tipoComidaID }
        });

        if (!tipoComida) {
            throw new Error("Tipo de comida no encontrado");
        }

        const montoCalculado = Number(tipoComida.monto);

        const nuevo = repoRegistro.create({
            Usuario: { usuarioID: registro.usuarioID, nombre:registro.nombre },
            TipoComida: { tipoComidaID: registro.tipoComidaID, nombreComida:registro.nombre },
            Cobro: { cobroID: registro.cobroID },
            fecha: registro.fecha,
            monto: montoCalculado
        });

        const guardado = await repoRegistro.save(nuevo);

        const cuenta = await repoCuenta.findOne({
            where: { Usuario: { usuarioID: registro.usuarioID } }
        });

        if (!cuenta) {
            throw new Error("El usuario no tiene una cuenta asociada");
        }

        cuenta.saldo = Number(cuenta.saldo) + montoCalculado;
        await repoCuenta.save(cuenta);

        const cobro = await repoCobro.findOne({
            where: { cobroID: registro.cobroID }
        });

        if (cobro && cobro.estado === "pagado") {
            cobro.estado = "pendiente";
            await repoCobro.save(cobro);
        }

        const conRelaciones = await repoRegistro.findOne({
            where: { registroID: guardado.registroID },
            relations: { Usuario: true, Cobro: true, TipoComida: true }
        });

        return mapearRegistro(conRelaciones);
    });
}

async function editar(id, registro) {
    return await AppDataSource.transaction(async (manager) => {
        const repoRegistro = manager.getRepository(registroEntity);
        const repoCuenta = manager.getRepository(cuentaEntity);
        const repoTipoComida = manager.getRepository(tipoComidaEntity);

        const existente = await repoRegistro.findOne({
            where: {registroID: id},
            relations: {Usuario: true}
        });

        if (!existente) {
            throw new Error("Registro no encontrado");
        }

        const montoViejo = Number(existente.monto);
        let montoNuevo = montoViejo;

        if (registro.tipoComidaID) {
            const tipoComida = await repoTipoComida.findOne({
                where: {tipoComidaID: registro.tipoComidaID}
            });

            if (!tipoComida) {
                throw new Error("Tipo de comida no encontrado");
            }

            montoNuevo = Number(tipoComida.monto);
            existente.TipoComida = {tipoComidaID: registro.tipoComidaID};
        }

        const diferencia = montoNuevo - montoViejo;

        existente.fecha = registro.fecha ?? existente.fecha;
        existente.monto = montoNuevo;

        if (registro.cobroID) {
            existente.Cobro = {cobroID: registro.cobroID};
        }

        await repoRegistro.save(existente);

        if (diferencia !== 0) {
            const cuenta = await repoCuenta.findOne({
                where: {Usuario: {usuarioID: existente.Usuario.usuarioID}}
            });

            if (!cuenta) {
                throw new Error("El usuario no tiene una cuenta asociada");
            }

            cuenta.saldo = Number(cuenta.saldo) + diferencia;
            await repoCuenta.save(cuenta);
        }

        const conRelaciones = await repoRegistro.findOne({
            where: {registroID: id},
            relations: {Usuario: true, Cobro: true, TipoComida: true}
        });

        return mapearRegistro(conRelaciones);
    });
}

async function eliminar(id) {
    return await AppDataSource.transaction(async (manager) => {
        const repoRegistro = manager.getRepository(registroEntity);
        const repoCuenta = manager.getRepository(cuentaEntity);

        const registro = await repoRegistro.findOne({
            where: { registroID: id },
            relations: { Usuario: true }
        });

        if (!registro) {
            throw new Error("No se encontro el registro");
        }

        const cuenta = await repoCuenta.findOne({
            where: { Usuario: { usuarioID: registro.Usuario.usuarioID } }
        });

        if (cuenta) {
            cuenta.saldo = Math.max(0, Number(cuenta.saldo) - Number(registro.monto));
            await repoCuenta.save(cuenta);
        }

        await repoRegistro.delete({ registroID: id });
    });
}

module.exports = {obtenerTodos, crear, eliminar, editar}