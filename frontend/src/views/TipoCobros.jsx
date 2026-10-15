import { tipoCobroService } from "../service/tipoCobroService";
import TablaTipoCobro from "../components/tablas/TablaTipoCobro";
import TablaPaginacion from "../components/tablas/TablaPaginacion";
import Buscador from "../components/Buscador";
import { useState, useEffect, useMemo } from "react";

function TipoCobros() {
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(5);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await tipoCobroService.obtenerTodos();
            setData(datos);
        } catch (error) {
            console.error("Error al cargar los tipos de cobro", error);
            setError("No se pudo cargar la lista de tipos de cobros");
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

    const tiposFiltrados = useMemo(() => {
        const lista = data || [];
        const termino = busqueda.trim().toLowerCase();

        return lista.filter((r) => {
            const nombreUsuario = String(r.nombre || "").toLowerCase();
            return !termino || nombreUsuario.includes(termino);
        });
    }, [data, busqueda]);

    const maximo = Math.ceil(tiposFiltrados.length / porPagina);

    const tipoPaginados = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return tiposFiltrados.slice(inicio, fin);
    }, [tiposFiltrados, pagina, porPagina]);

    return (
        <>
            <div className="container-fluid px-5 mt-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                    <h1>Tipos de Cobro</h1>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="busqueda mb-3">
                    <Buscador
                        busqueda={busqueda}
                        onCambiarBusqueda={setBusqueda}
                        placeholder="Buscar Nombre"
                    />
                </div>

                <main className="main-content">
                    <TablaTipoCobro tipoCobro={tipoPaginados} onEliminado={cargarDatos} />

                    {tiposFiltrados.length > 0 && (
                        <nav className="paginacion mt-3 d-flex justify-content-center">
                            <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                        </nav>
                    )}
                </main>
            </div>
        </>
    );
}

export default TipoCobros;