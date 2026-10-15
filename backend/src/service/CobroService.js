const cobroEntity = require("../entities/Cobro")
const cuentaEntity = require("../entities/Cuentas")
const registroEntity = require("../entities/Registro")
const { AppDataSource } = require("../config/data-source");

function mapearCobro(cobro) {
    return {
        id: cobro.cobroID,
        cuentaID: cobro.Cuenta?.cuentaID,
        saldo: cobro.Cuenta?.saldo,
        nombreUsuario: cobro.Cuenta?.Usuario?.nombre,
        tipoCobroID: cobro.TipoCobro?.tipoCobroID,
        nombreTipoCobro: cobro.TipoCobro?.nombre,
        fechaInicio: cobro.fechaInicio,
        fechaFin: cobro.fechaFin,
        montoTotal: cobro.montoTotal,
        estado: cobro.estado
    }
}

async function obtenerTodos() {
    const repo = AppDataSource.getRepository(cobroEntity);
    const data = await repo.find({
        relations: { Cuenta: { Usuario: true }, TipoCobro: true },
        order: { cobroID: "ASC" }
    })

    return data.map(mapearCobro)
}

async function crear(cobro) {
    const repo = AppDataSource.getRepository(cobroEntity);
    const nuevo = repo.create({
        Cuenta: { cuentaID: cobro.cuentaID, saldo: cobro.saldo },
        TipoCobro: { tipoCobroID: cobro.tipoCobroID },
        fechaInicio: cobro.fechaInicio,
        fechaFin: cobro.fechaFin,
        montoTotal: cobro.montoTotal,
        estado: cobro.estado
    });

    const guardado = await repo.save(nuevo);

    const conRelaciones = await repo.findOne({
        where: { cobroID: guardado.cobroID },
        relations: { Cuenta: { Usuario: true }, TipoCobro: true }
    });

    return mapearCobro(conRelaciones);
}

async function pagar(id) {
    return await AppDataSource.transaction(async (manager) => {
        const repoCobro = manager.getRepository(cobroEntity);
        const repoCuenta = manager.getRepository(cuentaEntity);

        const cobro = await repoCobro.findOne({
            where: { cobroID: id },
            relations: { Cuenta: { Usuario: true }, TipoCobro: true }
        });

        if (!cobro) {
            throw new Error("Cobro no encontrado");
        }

        const cuenta = await repoCuenta.findOne({
            where: { cuentaID: cobro.Cuenta.cuentaID }
        });

        if (!cuenta) {
            throw new Error("Cuenta no encontrada");
        }

        const totalAPagar = Number(cuenta.saldo);

        cobro.montoTotal = totalAPagar;
        cobro.estado = "pagado";
        await repoCobro.save(cobro);

        cuenta.saldo = 0;
        await repoCuenta.save(cuenta);

        return mapearCobro(cobro);
    });
}

async function eliminar(id) {
    const repo = AppDataSource.getRepository(cobroEntity);
    const resultado = await repo.delete({ cobroID: id });
    if (resultado.affected === 0) {
        throw new Error("cobro no encontrado");
    }
}

module.exports = { obtenerTodos, crear, eliminar, pagar }