import { useState } from "react";
import { FaSave } from "react-icons/fa";

const estadoInicial = {
    nombre: "",
    monto: ""
}

function Form2Campos({ onGuardar }) {
    const [form, setForm] = useState(estadoInicial);
    const [error, setError] = useState("");

    function manejarCambio(e) {
        const nombre = e.target.name;
        const valor = e.target.value;

        setForm((anterior) => ({
            ...anterior,
            [nombre]: valor
        }))
    }

    async function manejarEnvio(e) {
        e.preventDefault();

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
            await onGuardar({ nombre: nombreLimpio, monto: montoNumero });
            setForm(estadoInicial);
        } catch (error) {
            setError(error.message || "Error al enviar");
        }
    }

    return (
        <>
            <section className="container mt-5 d-flex justify-content-center">
                <div className="form-container">
                    {error && <div className="alert alert-danger">{error} </div>}

                    <form id="form-comida" onSubmit={manejarEnvio}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" name="nombre" id="nombre"
                                className="form-control"
                                value={form.nombre}
                                onChange={manejarCambio}
                                required />


                        </div>

                        <div className="mb-3">
                            <label htmlFor="monto" className="form-label">Monto</label>
                            <input type="number" name="monto" id="monto"
                                step="0.01"
                                min="0"
                                className="form-control"
                                value={form.monto}
                                onChange={manejarCambio}
                                required />
                        </div>

                        <button type="submit" className="btn d-inline-flex align-items-center justify-content-center gap-2 btn-form">
                            <FaSave />Registrar
                        </button>
                    </form>
                </div>


            </section>
        </>
    )
}

export default Form2Campos;