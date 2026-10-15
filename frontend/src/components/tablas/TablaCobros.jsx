import { useState } from "react";
import { cobroService } from "../../service/cobroService";
import Eliminar from "../modals/Eliminar";
import Pagar from "../modals/Pagar";
import { FaTrash, FaMoneyBillWave } from "react-icons/fa";


function TablaCobros({ cobro, onEliminado, onPagado }) {
    const [errorEliminar, setErrorEliminar] = useState("");
    const [cobroEliminar, setCobroEliminar] = useState(null);
    const [errorPagar, setErrorPagar] = useState("");
    const [cobroPagar, setCobroPagar] = useState(null);
    const [procesandoPago, setProcesandoPago] = useState(false);

    if (!cobro || cobro.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron Cobros registrados
            </div>
        );
    }

    const handleEliminar = async () => {
        if (!cobroEliminar) return;
        try {
            setErrorEliminar("");
            await cobroService.eliminar(cobroEliminar.id);

            setCobroEliminar(null);
            if (onEliminado) {
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar("Error al eliminar el cobro")
        }
    }

    const handlePagar = async (id) => {
        try {
            setErrorPagar("");
            await cobroService.pagar(id);
            if (onPagado) {
                await onPagado();
            }
        } catch (error) {
            setErrorPagar("Error al pagar el cobro")
        }
    }

    const handleConfirmarPago = async () => {
        if (!cobroPagar) return;
        try {
            setErrorPagar("");
            setProcesandoPago(true);
            await cobroService.pagar(cobroPagar.id);
            setCobroPagar(null);
            if (onPagado) {
                await onPagado();
            }
        } catch (error) {
            setErrorPagar(error.message || "Error al pagar el cobro")
        } finally {
            setProcesandoPago(false);
        }
    }

    return (

        <>
            <div className="table-responsive mt-5">
                <table className="table table-hover align-middle border mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del usuario</th>
                            <th>Cuenta</th>
                            <th>Tipo de Cobro</th>
                            <th>Ultimo Monto</th>
                            <th>Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cobro.map((item) => (
                            <tr key={item.id}>
                                <td><small>{item.id}</small></td>
                                <td>{item.nombreUsuario}</td>
                                <td>{item.saldo}</td>
                                <td>{item.nombreTipoCobro}</td>
                                <td>₡{Number(item.montoTotal).toFixed(2)}</td>
                                <td>
                                    <span className={`badge ${item.estado === "pagado" ? "bg-success" : "bg-warning text-dark"}`}>
                                        {item.estado}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <button type="button"
                                        className="btn btn-primary d-inline-flex align-items-center justify-content-center p-2 me-2"
                                        onClick={() => setCobroPagar(item)}
                                        title="pagar">
                                        <FaMoneyBillWave />
                                    </button>

                                    <button type="button"
                                        className="btn btn-danger d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setCobroEliminar(item)}
                                        title="eliminar">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {cobroEliminar && (
                    <Eliminar
                        u={cobroEliminar}
                        show={Boolean(cobroEliminar)}
                        onCerrar={() => setCobroEliminar(null)}
                        onEliminar={handleEliminar}
                    />
                )}

                {cobroPagar && (
                    <Pagar
                        cobro={cobroPagar}
                        show={Boolean(cobroPagar)}
                        onCerrar={() => setCobroPagar(null)}
                        onConfirmar={handleConfirmarPago}
                        procesando={procesandoPago}
                    />
                )}
            </div>
        </>
    )
}

export default TablaCobros;