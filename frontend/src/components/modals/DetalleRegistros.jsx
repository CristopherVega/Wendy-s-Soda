import { useState, useMemo } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { registroService } from "../../service/registroService";
import { FaTrash } from "react-icons/fa";

function DetalleRegistros({ grupo, show, onCerrar, onEliminado }) {
    const [error, setError] = useState("");

    const resumen = useMemo(() => {
        const mapa = {};
        grupo.detalle.forEach((r) => {
            const clave = r.nombreComida || r.tipoComidaID;
            if (!mapa[clave]) mapa[clave] = { comida: clave, cantidad: 0, subtotal: 0 };
            mapa[clave].cantidad += 1;
            mapa[clave].subtotal += Number(r.monto);
        });
        return Object.values(mapa);
    }, [grupo]);

    const handleEliminar = async (r) => {
        if (!window.confirm(`¿Eliminar el registro #${r.id}?`)) return;
        try {
            setError("");
            await registroService.eliminar(r.id);
            if (onEliminado) await onEliminado();
        } catch (e) {
            setError(e.message || "Error al eliminar el registro");
        }
    };

    return (
        <Modal show={show} size="lg" onHide={onCerrar} centered>
            <ModalHeader closeButton>
                <ModalTitle>Detalle de {grupo.nombreUsuario}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {error && <div className="alert alert-danger">{error}</div>}

                <h6>Resumen por comida</h6>
                <table className="table table-sm mb-4">
                    <thead>
                        <tr>
                            <th>Comida</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumen.map((x) => (
                            <tr key={x.comida}>
                                <td>{x.comida}</td>
                                <td>x{x.cantidad}</td>
                                <td>₡{x.subtotal.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h6>Registros</h6>
                <div className="table-responsive">
                    <table className="table table-sm align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Comida</th>
                                <th>Cobro</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grupo.detalle.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.nombreComida}</td>
                                    <td>{r.cobroID}</td>
                                    <td>{r.fecha}</td>
                                    <td>₡{Number(r.monto).toFixed(2)}</td>
                                    <td className="text-center">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm p-2"
                                            onClick={() => handleEliminar(r)}
                                            title="eliminar"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="fw-bold text-end mb-0">
                    {grupo.cantidad} comidas · Total: ₡{grupo.total.toFixed(2)}
                </p>
            </ModalBody>
            <ModalFooter>
                <button onClick={onCerrar} className="btn btn-secondary">Cerrar</button>
            </ModalFooter>
        </Modal>
    );
}

export default DetalleRegistros;