import { useState, useEffect, useMemo } from "react";
import { FaSave } from "react-icons/fa";
import { usuarioService } from "../../service/usuarioService";
import { cuentaService } from "../../service/cuentaService";
import { tipoCobroService } from "../../service/tipoCobroService";

function formatear(d) {
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

function sumarDias(fechaStr, dias) {
    const [y, m, d] = fechaStr.split("-").map(Number);
    const fecha = new Date(y, m - 1, d);
    fecha.setDate(fecha.getDate() + Number(dias));
    return formatear(fecha);
}

const estadoInicial = {
    usuarioID: "",
    tipoCobroID: "",
    fechaInicio: formatear(new Date()),
    fechaFin: ""
};

function FormCobro({ onGuardar }) {
    const [form, setForm] = useState(estadoInicial);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [cuentas, setCuentas] = useState([]);
    const [tiposCobro, setTiposCobro] = useState([]);

    useEffect(() => {
        async function cargarOpciones() {
            try {
                const [u, c, t] = await Promise.all([
                    usuarioService.obtenerTodos(),
                    cuentaService.obtenerTodos(),
                    tipoCobroService.obtenerTodos()
                ]);
                setUsuarios(Array.isArray(u) ? u : []);
                setCuentas(Array.isArray(c) ? c : []);
                setTiposCobro(Array.isArray(t) ? t : []);
            } catch (e) {
                setError("No se pudieron cargar las opciones del formulario");
            } finally {
                setCargando(false);
            }
        }
        cargarOpciones();
    }, []);

    const cuentaUsuario = useMemo(
        () => cuentas.find((c) => String(c.usuarioID) === String(form.usuarioID)),
        [cuentas, form.usuarioID]
    );

    const tipoSeleccionado = useMemo(
        () => tiposCobro.find((t) => String(t.id) === String(form.tipoCobroID)),
        [tiposCobro, form.tipoCobroID]
    );

    // La fecha fin se calcula con los días del tipo de cobro
    useEffect(() => {
        if (tipoSeleccionado && form.fechaInicio) {
            setForm((anterior) => ({
                ...anterior,
                fechaFin: sumarDias(anterior.fechaInicio, tipoSeleccionado.diasIntervalo)
            }));
        }
    }, [tipoSeleccionado, form.fechaInicio]);

    const sinCuenta = Boolean(form.usuarioID && !cuentaUsuario);

    function manejarCambio(e) {
        const { name, value } = e.target;
        setForm((anterior) => ({ ...anterior, [name]: value }));
    }

    async function manejarEnvio(e) {
        e.preventDefault();

        if (!form.usuarioID) return setError("Selecciona una persona");
        if (sinCuenta) return setError("Esta persona no tiene una cuenta");
        if (!form.tipoCobroID) return setError("Selecciona un tipo de cobro");
        if (!form.fechaInicio || !form.fechaFin) return setError("Las fechas son obligatorias");
        if (new Date(form.fechaFin) < new Date(form.fechaInicio)) {
            return setError("La fecha fin no puede ser anterior a la fecha inicio");
        }

        try {
            setError("");
            await onGuardar({
                cuentaID: cuentaUsuario.id,
                tipoCobroID: Number(form.tipoCobroID),
                fechaInicio: form.fechaInicio,
                fechaFin: form.fechaFin,
                montoTotal: 0,
                estado: "pendiente"
            });
            setForm({ ...estadoInicial, fechaInicio: formatear(new Date()) });
        } catch (err) {
            setError(err.message || "Error al registrar el cobro");
        }
    }

    return (
        <section className="container mt-5 d-flex justify-content-center">
            <div className="form-container">
                {error && <div className="alert alert-danger">{error}</div>}

                <form id="form-cobro" onSubmit={manejarEnvio}>
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

                    <div className="mb-3">
                        <label htmlFor="tipoCobroID" className="form-label">Tipo de cobro</label>
                        <select
                            name="tipoCobroID"
                            id="tipoCobroID"
                            className="form-select"
                            value={form.tipoCobroID}
                            onChange={manejarCambio}
                            disabled={cargando || sinCuenta}
                            required
                        >
                            <option value="">Seleccione un tipo de cobro</option>
                            {tiposCobro.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.nombre} ({t.diasIntervalo} días)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fechaInicio" className="form-label">Fecha inicio</label>
                        <input
                            type="date"
                            name="fechaInicio"
                            id="fechaInicio"
                            className="form-control"
                            value={form.fechaInicio}
                            onChange={manejarCambio}
                            disabled={sinCuenta}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fechaFin" className="form-label">Fecha fin</label>
                        <input
                            type="date"
                            name="fechaFin"
                            id="fechaFin"
                            className="form-control"
                            value={form.fechaFin}
                            onChange={manejarCambio}
                            disabled={sinCuenta}
                            required
                        />
                        {tipoSeleccionado && (
                            <div className="form-text">
                                Calculada con los {tipoSeleccionado.diasIntervalo} días del tipo de cobro (puedes cambiarla).
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn d-inline-flex align-items-center justify-content-center gap-2 btn-form"
                        disabled={sinCuenta || cargando}
                    >
                        <FaSave /> Registrar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormCobro;