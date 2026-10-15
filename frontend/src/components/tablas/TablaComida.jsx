import { useState } from "react";
import { comidaService } from "../../service/comidaService";
import Eliminar from "../modals/Eliminar";
import Editar from "../modals/Editar";
import { FaTrash, FaEdit } from "react-icons/fa";

function TablaComida({ comida, onEditado }) {
    const [errorEliminar, setErrorEliminar] = useState("");
    const [comidaEliminar, setComidaEliminar] = useState(null);
    const [comidaEditar, setComidaEditar] = useState(null);

    if (!comida || comida.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron Tipos de Comida registrados
            </div>
        );
    }

    const handleEliminar = async () => {
        if (!comidaEliminar) return;
        try {
            setErrorEliminar("");
            await comidaService.eliminar(comidaEliminar.id);

            setComidaEliminar(null);

            if (onEditado) {
                await onEditado();
            }
        } catch (error) {
            setErrorEliminar("Ocurrio un error al eliminar la comida ");
        }
    };

    const handleEditar = async (id, datos) => {
        await comidaService.editar(id, datos);
        if (onEditado) {
            await onEditado();
        }
    };

    return (
        <>
            {errorEliminar && <div className="alert alert-danger">{errorEliminar}</div>}

            <div className="table-responsive mt-5">
                <table className="table table-hover align-middle border mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Monto</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comida.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <small>{item.id}</small>
                                </td>
                                <td>{item.nombre}</td>
                                <td>₡{Number(item.monto).toFixed(2)}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm d-inline-flex align-items-center justify-content-center p-2 me-2"
                                        onClick={() => setComidaEditar(item)}
                                        title="editar"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setComidaEliminar(item)}
                                        title="eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {comidaEliminar && (
                    <Eliminar
                        u={comidaEliminar}
                        show={Boolean(comidaEliminar)}
                        onCerrar={() => setComidaEliminar(null)}
                        onEliminar={handleEliminar}
                    />
                )}

                {comidaEditar && (
                    <Editar
                        item={comidaEditar}
                        show={Boolean(comidaEditar)}
                        onCerrar={() => setComidaEditar(null)}
                        onGuardar={handleEditar}
                    />
                )}
            </div>
        </>
    );
}

export default TablaComida;