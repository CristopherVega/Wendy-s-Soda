import { useState, useEffect } from "react";
import { ModalHeader, ModalBody, Modal, ModalFooter, ModalTitle } from "react-bootstrap";
import { FaSave } from "react-icons/fa";

function Editar({ item, onGuardar, onCerrar, show }) {
    const [form, setForm] = useState({ nombre: "", monto: "" });
    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (item) {
            setForm({
                nombre: item.nombre || "",
                monto: item.monto ?? ""
            });
            setError("");
        }
    }, [item]);

    function manejarCambio(e) {
        const nombre = e.target.name;
        const valor = e.target.value;

        setForm((anterior) => ({
            ...anterior,
            [nombre]: valor
        }));
    }

    async function manejarGuardar() {
        const nombreLimpio = form.nombre.trim();
        const montoNumero = parseFloat(form.monto);

        if (!nombreLimpio) {
            setError("El nombre es obligatorio");
            return;
        }

        if (isNaN(montoNumero) || montoNumero <= 0) {
            setError("El monto debe ser un número válido mayor a 0");
            return;
        }

        try {
            setError("");
            setGuardando(true);
            await onGuardar(item.id, { nombre: nombreLimpio, monto: montoNumero });
            onCerrar();
        } catch (error) {
            setError(error.message || "Error al actualizar");
        } finally {
            setGuardando(false);
        }
    }

    return (
        <>
            <Modal show={show} size="md" onHide={onCerrar} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Editar Registro</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="form-control"
                            value={form.nombre}
                            onChange={manejarCambio}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="monto" className="form-label">Monto</label>
                        <input
                            type="number"
                            name="monto"
                            id="monto"
                            step="0.01"
                            min="0"
                            className="form-control"
                            value={form.monto}
                            onChange={manejarCambio}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={onCerrar} className="btn btn-secondary">Cancelar</button>
                    <button onClick={manejarGuardar} disabled={guardando} className="btn btn-primary d-inline-flex align-items-center gap-2">
                        <FaSave /> {guardando ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Editar;