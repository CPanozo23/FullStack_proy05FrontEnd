import ReservationReadModal from '../modals/ReservationReadModal'
import useModal from "../../hooks/useModal"
const ReservationReadBtn = () => {
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <button type="button" className='btn btn-primary m-1' onClick={openModal}>Ver / Re-agendar</button>
            {isOpen && (
                <ReservationReadModal isOpen={isOpen} onClose={closeModal} />
            )}
        </>
    )

}

export default ReservationReadBtn
