import { use, useState } from "react";
import { cuentaService } from "../../service/cuentaService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";

function TablaCuentas({cuenta, onEliminado}){
    const [errorEliminar, setErrorEliminar]= useState("");
    const [cuentaEliminar, setCuentaEliminar]= useState(null);

      if (!cuenta || cuenta.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron cuentas registrados
            </div>
        );
    }
    const handelEliminar= async () => {
        if(!cuentaEliminar) return;
        try {
            setErrorEliminar("");
            await cuentaService.eliminar(cuentaEliminar.id)
            setCuentaEliminar(null);
            if(onEliminado){
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar("Error al eliminar la cuenta ")
        }
    };
    return(
        <>
        <div className="table-responsive mt-5">
            <table className="table table-hover align-middle border mb-0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Usuario</th>
                        <th>Saldo</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cuenta.map((user)=>(
                        <>
                        <tr key={user.id}>
                            <td><small>{user.id}</small></td>
                            <td>{user.nombreUsuario}</td>
                            <td>{user.saldo}</td>
                            <td className="text-center">
                                <button
                                type="button"
                                className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                onClick={()=> setCuentaEliminar(user)}
                                title="eliminar">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                        </>
                    ))}
                </tbody>
            </table>
            {cuentaEliminar && (
                <Eliminar
                u={cuentaEliminar}
                show={Boolean(cuentaEliminar)}
                onCerrar={()=> setCuentaEliminar(null)}
                onEliminar={handelEliminar}
                />
            )}
        </div>
        </>
    )
}

export default TablaCuentas;