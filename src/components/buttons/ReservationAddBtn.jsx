import ReservationAddModal from '../modals/ReservationAddModal'
import useModal from "../../hooks/useModal"
const ReservationAddBtn = () => {
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <button type="button" className='btn btn-primary m-1' onClick={openModal}>Agendar</button>
            {isOpen && (
                <ReservationAddModal isOpen={isOpen} onClose={closeModal} />
            )}
        </>
    )

}

export default ReservationAddBtn
