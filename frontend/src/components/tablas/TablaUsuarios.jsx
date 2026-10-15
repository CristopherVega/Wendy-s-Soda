import { useState } from "react";
import { usuarioService } from "../../service/usuarioService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";

function TablaUsuarios({ usuarios, onEliminado }) {
    const [errorEliminar, setErrorEliminar] = useState("");
    const [usuarioEliminar, setUsuarioEliminar] = useState(null);

    if (!usuarios || usuarios.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron Usuarios registrados
            </div>
        );
    }

    const handleEliminar = async () => {
        if (!usuarioEliminar) return;
        try {
            setErrorEliminar("");
            await usuarioService.eliminar(usuarioEliminar.id);

            setUsuarioEliminar(null);

            if (onEliminado) {
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar("Ocurrio un error al eliminar el usuario ");
        }
    };
    return (
        <>
            <div className="table-responsive mt-5">
                <table className="table table-hover align-middle border mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombres</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <small>{user.id}</small>
                                </td>
                                <td>{user.nombre}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setUsuarioEliminar(user)}
                                        title="eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {usuarioEliminar && (
                    <Eliminar
                        u={usuarioEliminar}
                        show={Boolean(usuarioEliminar)}
                        onCerrar={() => setUsuarioEliminar(null)}
                        onEliminar={handleEliminar}
                    />
                )}
            </div>
        </>
    );
}

export default TablaUsuarios;
