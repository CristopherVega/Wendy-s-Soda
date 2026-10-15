import { useState, useEffect, useMemo } from "react";
import { FaSave } from "react-icons/fa";
import { usuarioService } from "../../service/usuarioService";
import { cuentaService } from "../../service/cuentaService";

function FormCuenta({ onGuardar }) {
    const [usuarioID, setUsuarioID] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [cuentas, setCuentas] = useState([]);

    async function cargarOpciones() {
        try {
            const [u, c] = await Promise.all([
                usuarioService.obtenerTodos(),
                cuentaService.obtenerTodos()
            ]);
            setUsuarios(Array.isArray(u) ? u : []);
            setCuentas(Array.isArray(c) ? c : []);
        } catch (e) {
            setError("No se pudieron cargar las opciones del formulario");
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarOpciones();
    }, []);

    // Solo usuarios que aún no tienen cuenta
    const usuariosSinCuenta = useMemo(() => {
        const conCuenta = new Set(cuentas.map((c) => String(c.usuarioID)));
        return usuarios.filter((u) => !conCuenta.has(String(u.id)));
    }, [usuarios, cuentas]);

    async function manejarEnvio(e) {
        e.preventDefault();

        if (!usuarioID) return setError("Selecciona una persona");

        try {
            setError("");
            await onGuardar({ usuarioID: Number(usuarioID) });
            setUsuarioID("");
            await cargarOpciones(); // refresca la lista de personas sin cuenta
        } catch (err) {
            setError(err.message || "Error al registrar la cuenta");
        }
    }

    return (
        <section className="container mt-5 d-flex justify-content-center">
            <div className="form-container">
                {error && <div className="alert alert-danger">{error}</div>}

                {!cargando && usuariosSinCuenta.length === 0 && (
                    <div className="alert alert-info">
                        Todas las personas ya tienen una cuenta.
                    </div>
                )}

                <form id="form-cuenta" onSubmit={manejarEnvio}>
                    <div className="mb-3">
                        <label htmlFor="usuarioID" className="form-label">Persona</label>
                        <select
                            id="usuarioID"
                            className="form-select"
                            value={usuarioID}
                            onChange={(e) => setUsuarioID(e.target.value)}
                            disabled={cargando || usuariosSinCuenta.length === 0}
                            required
                        >
                            <option value="">Seleccione una persona</option>
                            {usuariosSinCuenta.map((u) => (
                                <option key={u.id} value={u.id}>{u.nombre}</option>
                            ))}
                        </select>
                        <div className="form-text">La cuenta inicia con saldo ₡0.00.</div>
                    </div>

                    <button
                        type="submit"
                        className="btn d-inline-flex align-items-center justify-content-center gap-2 btn-form"
                        disabled={cargando || usuariosSinCuenta.length === 0}
                    >
                        <FaSave /> Registrar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormCuenta;