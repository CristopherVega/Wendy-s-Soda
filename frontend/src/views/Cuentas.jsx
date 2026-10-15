import { cuentaService } from "../service/cuentaService";
import TablaCuentas from "../components/tablas/TablaCuentas";
import TablaPaginacion from "../components/tablas/TablaPaginacion";
import Buscador from "../components/Buscador";
import { useState, useEffect, useMemo } from "react";
import FormCuenta from "../components/forms/FormCuenta";
import { FaPlus } from "react-icons/fa";

function Cuentas() {
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(5);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

   
    const handleGuardar = async (cuenta) => {
        await cuentaService.crear(cuenta);
        await cargarDatos();
    };

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await cuentaService.obtenerTodos();
            setData(datos);
        } catch (error) {
            console.error("Error al cargar las cuentas", error);
            setError("No se pudo cargar la lista de cuentas");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        setPagina(1);
    }, [busqueda]);

    const cuentasFiltradas = useMemo(() => {
        const lista = data || [];
        const termino = busqueda.trim().toLowerCase();

        return lista.filter((r) => {
            const nombreUsuario = String(r.nombreUsuario || "").toLowerCase();
            return !termino || nombreUsuario.includes(termino);
        });
    }, [data, busqueda]);

    const maximo = Math.ceil(cuentasFiltradas.length / porPagina);

    const cuentasPaginadas = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return cuentasFiltradas.slice(inicio, fin);
    }, [cuentasFiltradas, pagina, porPagina]);

    return (
        <>
            <div className="container-fluid px-5 mt-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                    <h1>Cuentas</h1>
                    <button
                        className="btn btn-primary d-inline-flex align-items-center gap-2"
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    >
                        <FaPlus />
                        <span>{mostrarFormulario ? "Cerrar Formulario" : "Registrar Cuenta"}</span>
                    </button>
                </div>

                {mostrarFormulario && (
                    <div className="mb-4">
                        <h3 className="text-center mt-3">Registrar Cuenta</h3>
                        <FormCuenta onGuardar={handleGuardar} />
                    </div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="busqueda mb-3">
                    <Buscador
                        busqueda={busqueda}
                        onCambiarBusqueda={setBusqueda}
                        placeholder="Buscar Nombre"
                    />
                </div>

                <main className="main-content">
                    <TablaCuentas cuenta={cuentasPaginadas} onEliminado={cargarDatos} />

                    {cuentasFiltradas.length > 0 && (
                        <nav className="paginacion mt-3 d-flex justify-content-center">
                            <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                        </nav>
                    )}
                </main>
            </div>
        </>
    );
}

export default Cuentas;