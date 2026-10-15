import { useState } from "react";
import { FaSave } from "react-icons/fa";

const estadoInicial={
    nombre:""
}

function Form1Campo({onGuardar}){
    const [formulario, setFormulario]= useState(estadoInicial);
    const [erorr, setError ]= useState("");

    function manejarCambio(e){
        const nombre= e.target.name;
        const valor= e.target.value;

        setFormulario((anterior)=>({
            ...anterior,
            [nombre]: valor
        }));
    }
    async function manejarEnvio(e) {
        e.preventDefault();
        try {
            setError("");
            await onGuardar(formulario);
            setFormulario(estadoInicial);
        } catch (error) {
            setError(erorr.message || "Error al procesar el envio ")
        }
    }

    return(
        <>
        <section className="container mt-5 d-flex justify-content-center">
            <div className="form-container">
                {erorr && <div className="alert alert-danger">{erorr}</div>}

                <form id="form-registro" onSubmit={manejarEnvio}>

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" name="nombre" id="nombre"
                        className="form-control"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        required />
                    </div>

                    <button type="submit" className="btn d-inline-flex align-items-center justify-content-center gap-2 btn-form">
                        <FaSave/>Registrar
                    </button>
                </form>
            </div>
        </section>
        </>
    )
}

export default Form1Campo;