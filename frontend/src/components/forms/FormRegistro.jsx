import { useState, useEffect, useMemo } from "react";
import { FaSave } from "react-icons/fa";
import { usuarioService } from "../../service/usuarioService";
import { cuentaService } from "../../service/cuentaService";
import { cobroService } from "../../service/cobroService";
import { comidaService } from "../../service/comidaService";

function hoy() {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

const estadoInicial = {
    usuarioID: "",
    cobroID: "",
    tipoComidaID: "",
    fecha: hoy()
};

function FormRegistro({ onGuardar }) {
    const [form, setForm] = useState(estadoInicial);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [cuentas, setCuentas] = useState([]);
    const [cobros, setCobros] = useState([]);
    const [comidas, setComidas] = useState([]);

    useEffect(() => {
        async function cargarOpciones() {
            try {
                const [u, c, co, cm] = await Promise.all([
                    usuarioService.obtenerTodos(),
                    cuentaService.obtenerTodos(),
                    cobroService.obtenerTodos(),
                    comidaService.obtenerTodos()
                ]);
                setUsuarios(Array.isArray(u) ? u : []);
                setCuentas(Array.isArray(c) ? c : []);
                setCobros(Array.isArray(co) ? co : []);
                setComidas(Array.isArray(cm) ? cm : []);
            } catch (e) {
                setError("No se pudieron cargar las opciones del formulario");
            } finally {
                setCargando(false);
            }
        }
        cargarOpciones();
    }, []);

    // Cuenta del usuario seleccionado
    const cuentaUsuario = useMemo(
        () => cuentas.find((c) => String(c.usuarioID) === String(form.usuarioID)),
        [cuentas, form.usuarioID]
    );

    // Cobros vinculados a esa cuenta
    const cobrosUsuario = useMemo(() => {
        if (!cuentaUsuario) return [];
        return cobros.filter((c) => c.cuentaID === cuentaUsuario.id);
    }, [cobros, cuentaUsuario]);

    // Si el usuario tiene un solo cobro, se selecciona solo
    useEffect(() => {
        if (!form.usuarioID) return;
        setForm((anterior) => ({
            ...anterior,
            cobroID: cobrosUsuario.length === 1 ? String(cobrosUsuario[0].id) : ""
        }));
    }, [cobrosUsuario, form.usuarioID]);

    const sinCuenta = form.usuarioID && !cuentaUsuario;
    const sinCobro = form.usuarioID && cuentaUsuario && cobrosUsuario.length === 0;
    const bloqueado = Boolean(sinCuenta || sinCobro);

    const comidaSeleccionada = comidas.find(
        (c) => String(c.id) === String(form.tipoComidaID)
    );

    function manejarCambio(e) {
        const { name, value } = e.target;
        setForm((anterior) => ({ ...anterior, [name]: value }));
    }

    async function manejarEnvio(e) {
        e.preventDefault();

        if (!form.usuarioID) return setError("Selecciona una persona");
        if (sinCuenta) return setError("Esta persona no tiene una cuenta");
        if (sinCobro) return setError("Esta persona no tiene un cobro asociado");
        if (!form.cobroID) return setError("Selecciona un cobro");
        if (!form.tipoComidaID) return setError("Selecciona una comida");
        if (!form.fecha) return setError("La fecha es obligatoria");

        try {
            setError("");
            await onGuardar({
                usuarioID: Number(form.usuarioID),
                cobroID: Number(form.cobroID),
                tipoComidaID: Number(form.tipoComidaID),
                fecha: form.fecha
            });
            setForm({ ...estadoInicial, fecha: hoy() });
        } catch (err) {
            setError(err.message || "Error al registrar");
        }
    }

    return (
        <section className="container mt-5 d-flex justify-content-center">
            <div className="form-container">
                {error && <div className="alert alert-danger">{error}</div>}

                <form id="form-registro" onSubmit={manejarEnvio}>
                    <div className="mb-3">
                        <label htmlFor="usuarioID" className="form-label">Persona</label>
                        <select
                            name="usuarioID"
                            id="usuarioID"
                            className="form-select"
                            value={form.usuarioID}
                            onChange={manejarCambio}
                            disabled={cargando}
                            required
                        >
                            <option value="">Seleccione una persona</option>
                            {usuarios.map((u) => (
                                <option key={u.id} value={u.id}>{u.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {sinCuenta && (
                        <div className="alert alert-warning">
                            Esta persona no tiene una cuenta. Créala primero.
                        </div>
                    )}
                    {sinCobro && (
                        <div className="alert alert-warning">
                            Esta persona no tiene un cobro asociado. Crea un cobro primero.
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="cobroID" className="form-label">Cobro</label>
                        <select
                            name="cobroID"
                            id="cobroID"
                            className="form-select"
                            value={form.cobroID}
                            onChange={manejarCambio}
                            disabled={bloqueado || !form.usuarioID}
                            required
                        >
                            <option value="">
                                {form.usuarioID ? "Seleccione un cobro" : "Primero elija una persona"}
                            </option>
                            {cobrosUsuario.map((c) => (
                                <option key={c.id} value={c.id}>
                                    #{c.id} · {c.nombreTipoCobro} · {c.fechaInicio} a {c.fechaFin} ({c.estado})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tipoComidaID" className="form-label">Comida</label>
                        <select
                            name="tipoComidaID"
                            id="tipoComidaID"
                            className="form-select"
                            value={form.tipoComidaID}
                            onChange={manejarCambio}
                            disabled={cargando || bloqueado}
                            required
                        >
                            <option value="">Seleccione una comida</option>
                            {comidas.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.nombre} - ₡{Number(c.monto).toFixed(2)}
                                </option>
                            ))}
                        </select>
                        {comidaSeleccionada && (
                            <div className="form-text">
                                Monto a registrar: ₡{Number(comidaSeleccionada.monto).toFixed(2)}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">Fecha</label>
                        <input
                            type="date"
                            name="fecha"
                            id="fecha"
                            className="form-control"
                            value={form.fecha}
                            onChange={manejarCambio}
                            disabled={bloqueado}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn d-inline-flex align-items-center justify-content-center gap-2 btn-form"
                        disabled={bloqueado || cargando}
                    >
                        <FaSave /> Registrar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormRegistro;