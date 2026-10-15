import { cobroRepository } from "../repositories/cobrosRepository";

function validarRegistro(cobro) {
    if (!cobro.cuentaID) {
        throw new Error("La cuenta es obligatoria")
    }
    if (!cobro.tipoCobroID) {
        throw new Error("El tipo de cobro es obligatorio")
    }
    if (!cobro.fechaInicio) {
        throw new Error("La fecha de inicio es obligatoria")
    }
    if (!cobro.fechaFin) {
        throw new Error("La fecha de fin es obligatoria")
    }
    if (new Date(cobro.fechaFin) < new Date(cobro.fechaInicio)) {
        throw new Error("La fecha de fin no puede ser anterior a la fecha de inicio")
    }
    if (!cobro.estado || cobro.estado.trim() === "") {
        throw new Error("El estado es obligatorio")
    }
}

export const cobroService = {
    obtenerTodos: function () {
        return cobroRepository.obtenerTodos();
    },
    crear: function (cobro) {
        validarRegistro(cobro);
        return cobroRepository.crear(cobro);
    },
    eliminar: function (id) {
        return cobroRepository.eliminar(id);
    },
    pagar: function (id) {
        return cobroRepository.pagar(id);
    }
}