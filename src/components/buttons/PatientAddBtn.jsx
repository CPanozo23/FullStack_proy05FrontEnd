import PatientAddModal from '../modals/PatientAddModal'
import useModal from "../../hooks/useModal"
const PatientAddBtn = () => {
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <button type="button" className='btn btn-primary m-1' onClick={openModal}>Agregar paciente</button>
            {isOpen && (
                <PatientAddModal isOpen={isOpen} onClose={closeModal} />
            )}
        </>
    )

}

export default PatientAddBtn
