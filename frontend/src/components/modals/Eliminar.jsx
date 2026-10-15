import { ModalHeader, ModalBody,Modal,ModalFooter, ModalTitle } from "react-bootstrap";

function Eliminar({u, onEliminar, onCerrar , show , mensaje}){
    return(
        <>
        <Modal show={show} size="md" onHide={onCerrar} centered>
            <ModalHeader className="bg-danger" closeButton>
                <ModalTitle>Confirmar Eliminacion</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <h4><strong>¿Deseas Eliminar este registro?</strong></h4>
                <p className="text-muted">{mensaje || u.titulo || u.nombre || "Registro seleccionado"}</p>
            </ModalBody>
            <ModalFooter>
                <button onClick={onCerrar} className="btn btn-secondary">Cancelar</button>
                <button onClick={onEliminar} className="btn btn-danger">Eliminar</button>
            </ModalFooter>
        </Modal>
        </>
    )
}

export default Eliminar;