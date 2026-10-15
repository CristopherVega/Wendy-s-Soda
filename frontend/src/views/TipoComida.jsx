import { comidaService } from "../service/comidaService";
import TablaComida from "../components/tablas/TablaComida";
import TablaPaginacion from "../components/tablas/TablaPaginacion";
import Buscador from "../components/Buscador";
import { useState, useEffect, useMemo } from "react";
import Form2Campos from "../components/forms/Form2Campos";
import { FaPlus } from "react-icons/fa";

function TipoComida(){

    const [data , setData]=useState([]);
    const [busqueda, setBusqueda]= useState("");
    const [cargando, setCargando]=useState(true);
    const [showForm, setShowForm]= useState(false);
    const [errorSubmit, setErrorSubmit]=useState(false);
    const [error, setError]= useState("");
    const [pagina, setPagina]=useState(1);
    const [porPagina, setPorPagina]=useState(5);

    const cargarDatos=async ()=>{
        try {
            setCargando(true);
            const datos= await comidaService.obtenerTodos();
            setData(datos);
        } catch (error) {
            console.error("Error cargando las comidas", error);
            setError("no se pudo cargar la lista de las comidas");

        }finally{
            setCargando(false)
        }
    }

    useEffect(()=>{
        cargarDatos();
    }, [])

    const handleGuardar=async(comida)=>{
        setErrorSubmit("");
        try {
            await comidaService.crear(comida);
            setShowForm(true);
            await cargarDatos();
        } catch (error) {
            setErrorSubmit(error.message || "Error al registrar la comida")
        }
    }

    useEffect(()=>{
        setPagina(1);
    }, [busqueda]);


    const comidaFiltrada=useMemo(()=>{
        const lista= data || [];

        return lista.filter((r)=>{
            const termino= busqueda.trim().toLowerCase();
            const nombre= String(r.nombre || "").toLowerCase();
            

            const busquedaCoincide=!termino || nombre.includes(termino);
            return busquedaCoincide;
        
        })
    }, [data, busqueda]);

    const maximo= Math.ceil(comidaFiltrada.length / porPagina);
    const comidaPaginada=useMemo(()=>{
        const inicio= (pagina-1)* porPagina;
        const fin= inicio + porPagina;
        return comidaFiltrada.slice(inicio, fin);
    }, [comidaFiltrada, pagina, porPagina])
    return(
        <>
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1>Tipo Comida</h1>
                <button className="btn btn-primary d-inline-flex align-items-center gap-2"
                 onClick={()=> setShowForm(!showForm)}>
                    <FaPlus />
                    <span>{showForm ? "Cerrar Formulario" : "Registrar Comida"}</span>
                </button>
            </div>
            {errorSubmit && <div className="alert alert-danger">{errorSubmit} </div>}
            {showForm &&(
                <div className="mb-4">
                    <h3>Registrar Comida </h3>
                    <Form2Campos onGuardar={handleGuardar}/>
                </div>
            )}

            <div className="busqueda mb-3">
                <Buscador busqueda={busqueda}
                onCambiarBusqueda={setBusqueda}
                placeholder="Buscar Comida" />
            </div>

            <main className="main-content">
                <TablaComida comida={comidaPaginada} onEditado={cargarDatos} />

                {comidaFiltrada.length > 0 &&(
                    <nav className="paginacion mt-3 d-flex justify-content-center">
                        <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                    </nav>
                )}
            </main>
        </div>
        </>
    )
}

export default TipoComida;