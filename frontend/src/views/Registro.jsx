import { registroService } from "../service/registroService";
import TablaRegistro from "../components/tablas/TablaRegistro";
import TablaPaginacion from "../components/tablas/TablaPaginacion";
import Buscador from "../components/Buscador";
import { useState, useEffect, useMemo } from "react";
import FormRegistro from "../components/forms/FormRegistro";
import { FaPlus } from "react-icons/fa";


function Registros(){

    const [listaData, setListaData]= useState([]);
    const [busqueda , setBusqueda]= useState("");
    const [cargando , setCargando]= useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState("");
    const [error, setError]=useState("");
    const [pagina , setPagina]= useState(1);
    const [porPagina, setPorPagina]= useState(5);

    const cargarDatos= async()=>{
        try {
            setCargando(true);
            const datos= await registroService.obtenerTodos();
            setListaData(Array.isArray(datos) ? datos : []);
        } catch (error) {
            console.error("Error cargando los registros", error);
            setError("No se pudo cargar la lista de registros");
        }finally{
            setCargando(false);
        }
    }

    useEffect(()=>{
        cargarDatos();
    }, [])

    // El error se propaga al formulario para que lo muestre y no limpie los campos
    const handleGuardar= async(nuevoRegistro)=>{
        setErrorSubmit("");
        await registroService.crear(nuevoRegistro);
        await cargarDatos();
    }

    useEffect(()=>{
        setPagina(1);
    }, [busqueda]);

    const registrosAgrupados= useMemo(()=>{
        const mapa= {};
        (listaData || []).forEach((r)=>{
            const clave= r.usuarioID;
            if(!mapa[clave]){
                mapa[clave]= {
                    id: clave,
                    nombre: r.nombre,
                    cantidad: 0,
                    total: 0,
                    detalle: []
                };
            }
            mapa[clave].cantidad += 1;
            mapa[clave].total += Number(r.monto);
            mapa[clave].detalle.push(r);
        });
        return Object.values(mapa);
    }, [listaData])

    const registrosFiltrados= useMemo(()=>{
        const termino= busqueda.trim().toLowerCase();

        return registrosAgrupados.filter((g)=>{
            const nombre= String(g.nombre || "").toLowerCase();
            return !termino || nombre.includes(termino);
        })
    }, [registrosAgrupados, busqueda])

    const maximo = Math.ceil(registrosFiltrados.length / porPagina);

    const registrosPaginados= useMemo(()=>{
        const inicio=(pagina -1 ) * porPagina;
        const fin=inicio + porPagina;
        return registrosFiltrados.slice(inicio, fin);
    }, [registrosFiltrados, pagina, porPagina])

    return(
        <>
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1>Registros</h1>
                <button
                        className="btn btn-primary d-inline-flex align-items-center gap-2"
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    >
                        <FaPlus />
                        <span>{mostrarFormulario ? "Cerrar Formulario" : "Registrar Consumo"}</span>
                    </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div> }
            {errorSubmit && <div className="alert alert-danger">{errorSubmit}</div> }
            {mostrarFormulario &&(
                <div className="mb-4">
                    <h3 className="text-center mt-3">Registrar Consumo</h3>
                    <FormRegistro onGuardar={handleGuardar}/>
                </div>
            )}
            <div className="busqueda mb-3">
                <Buscador
                busqueda={busqueda}
                onCambiarBusqueda={setBusqueda}
                placeholder="Buscar por persona"/>
            </div>

            <main className="main-content">
                <TablaRegistro registro={registrosPaginados} onEliminado={cargarDatos} />

                {registrosFiltrados.length > 0 && (
                    <nav className="paginacion mt-3 d-flex justify-content-center">
                        <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                    </nav>
                )}
            </main>
        </div>
        </>
    )
}

export default Registros;