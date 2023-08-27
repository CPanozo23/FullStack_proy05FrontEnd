import UpEmailModal from '../modals_client/UpEmailModal'
import useModal from "../../hooks/useModal"
const UpEmailBtn = ({id}) => {
    //window.alert(id)
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
        <button type="button" className='btn btn-primary m-1' onClick={openModal} id={id}>
          Actualizar email
        </button>
        {isOpen && <UpEmailModal isOpen={isOpen} onClose={closeModal} id={id} />}
      </>
    )

}

export default UpEmailBtn
