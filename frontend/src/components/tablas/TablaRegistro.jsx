import { useState } from "react";
import DetalleRegistros from "../modals/DetalleRegistros";
import { FaEye } from "react-icons/fa";

function TablaRegistro({ registro, onEliminado }) {
    const [seleccionadoId, setSeleccionadoId] = useState(null);

    if (!registro || registro.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron registros
            </div>
        );
    }

    // Se busca el grupo actualizado en cada render, así el modal refleja los borrados
    const grupo = registro.find((g) => g.id === seleccionadoId);

    return (
        <>
            <div className="table-responsive mt-5">
                <table className="table table-hover align-middle border mb-0">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Cantidad de comidas</th>
                            <th>Monto total</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registro.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nombre || item.usuarioID}</td>
                                <td>{item.cantidad}</td>
                                <td>₡{item.total.toFixed(2)}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setSeleccionadoId(item.id)}
                                        title="ver detalle"
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {grupo && (
                <DetalleRegistros
                    grupo={grupo}
                    show
                    onCerrar={() => setSeleccionadoId(null)}
                    onEliminado={onEliminado}
                />
            )}
        </>
    );
}

export default TablaRegistro;