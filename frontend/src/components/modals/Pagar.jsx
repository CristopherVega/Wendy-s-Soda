import { ModalHeader, ModalBody, Modal, ModalFooter, ModalTitle } from "react-bootstrap";

function Pagar({ cobro, onConfirmar, onCerrar, show, procesando }) {
    return (
        <>
            <Modal show={show} size="md" onHide={onCerrar} centered>
                <ModalHeader className="bg-success text-white" closeButton>
                    <ModalTitle>Confirmar Pago</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <h4><strong>¿Deseas marcar este cobro como pagado?</strong></h4>
                    <p className="text-muted">
                        Monto a pagar: ₡{Number(cobro?.saldo).toFixed(2)}
                    </p>
                    <p className="text-muted small">
                        Esta acción dejará el saldo de la cuenta en ₡0.00 y no se puede deshacer.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <button onClick={onCerrar} className="btn btn-secondary" disabled={procesando}>Cancelar</button>
                    <button onClick={onConfirmar} className="btn btn-success" disabled={procesando}>
                        {procesando ? "Procesando..." : "Confirmar Pago"}
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Pagar;