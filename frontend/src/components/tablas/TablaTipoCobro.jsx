import { useState } from "react";
import { tipoCobroService } from "../../service/tipoCobroService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";

function TablaTipoCobro({ tipoCobro, onEliminado }) {
    const [errorEliminar, setErrorEliminar] = useState("");
    const [tipoCobroEliminar, setTipoCobroEliminar] = useState(null);

    if (!tipoCobro || tipoCobro.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron tipos de cobro registrados
            </div>
        );
    }

    const handleEliminar = async () => {
        if (!tipoCobroEliminar) return;
        try {
            setErrorEliminar("");
            await tipoCobroService.eliminar(tipoCobroEliminar.id);

            setTipoCobroEliminar(null);

            if (onEliminado) {
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar("Ocurrió un error al eliminar el tipo de cobro");
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
                            <th>Días</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipoCobro.map((item) => (
                            <tr key={item.id}>
                                <td><small>{item.id}</small></td>
                                <td>{item.nombre}</td>
                                <td>{item.diasIntervalo}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setTipoCobroEliminar(item)}
                                        title="eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {tipoCobroEliminar && (
                    <Eliminar
                        u={tipoCobroEliminar}
                        show={Boolean(tipoCobroEliminar)}
                        onCerrar={() => setTipoCobroEliminar(null)}
                        onEliminar={handleEliminar}
                    />
                )}
            </div>
        </>
    );
}

export default TablaTipoCobro;