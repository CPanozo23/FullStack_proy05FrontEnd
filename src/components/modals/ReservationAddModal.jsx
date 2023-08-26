import { useState } from 'react'
import Modal from 'react-modal'
Modal.setAppElement('#root')
const ReservationAddModal = ({ isOpen, onClose }) => {
    
    return (
        <Modal
          isOpen={isOpen} onRequestClose={onClose} contentLabel="Agendar"
          overlayClassName="ReactModal__Overlay"
          className="p-2 bg-white rounded-3 col-11 col-sm-11 col-md-8 col-lg-7" >

<form>
  <h2>Agendar</h2>
        </form>
        <button type="button" onClick={onClose} className="btn btn-primary mx-1">
          Cerrar
        </button>
            </Modal>
            )
}

export default ReservationAddModal
