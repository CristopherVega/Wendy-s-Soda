import { cobroService } from "../service/cobroService";
import TablaCobros from "../components/tablas/TablaCobros";
import TablaPaginacion from "../components/tablas/TablaPaginacion";
import Buscador from "../components/Buscador";
import { useState, useEffect, useMemo } from "react";

import FormCobro from "../components/forms/FormCobro";
import { FaPlus } from "react-icons/fa";

function Cobros() {
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [carganado, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(5);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);


    const handleGuardar = async (cobro) => {
        await cobroService.crear(cobro);
        await cargarDatos();
    };

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await cobroService.obtenerTodos();
            setData(datos);
        } catch (error) {
            console.error("Error cargando los cobros", error)
            setError("no se pudo cargar la lista de cobros ")
        } finally {
            setCargando(false);
        }
    }
    useEffect(() => {
        cargarDatos();
    }, [])

    const cobrosFiltrados = useMemo(() => {
        const lista = data || [];

        return lista.filter((r) => {
            const termino = busqueda.trim().toLowerCase();
            const nombreUsuario = String(r.nombreUsuario || "").toLowerCase();

            const busquedaCoincide = !termino || nombreUsuario.includes(termino);
            return busquedaCoincide;
        })
    }, [data, busqueda]);

    const maximo = Math.ceil(cobrosFiltrados.length / porPagina);

    const cobrosPaginados = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return cobrosFiltrados.slice(inicio, fin);
    }, [cobrosFiltrados, pagina, porPagina])

    return (
        <>
            <div className="container-fluid px-5 mt-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                    <h1>Cobros</h1>
                    <button
                        className="btn btn-primary d-inline-flex align-items-center gap-2"
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    >
                        <FaPlus />
                        <span>{mostrarFormulario ? "Cerrar Formulario" : "Registrar Cobro"}</span>
                    </button>
                </div>

                {mostrarFormulario && (
                    <div className="mb-4">
                        <h3 className="text-center mt-3">Registrar Cobro</h3>
                        <FormCobro onGuardar={handleGuardar} />
                    </div>
                )}

                <div className="busqueda mb-3">
                    <Buscador busqueda={busqueda}
                        onCambiarBusqueda={setBusqueda}
                        placeholder="Buscar Cobros" />
                </div>

                <main className="main-content">
                    <TablaCobros cobro={cobrosPaginados} onEliminado={cargarDatos} onPagado={cargarDatos} />

                    {cobrosFiltrados.length > 0 && (
                        <nav className="paginacion mt-3 d-flex justify-content-center">
                            <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                        </nav>
                    )}
                </main>
            </div>
        </>
    )

}

export default Cobros;