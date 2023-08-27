import UpPWModal from '../modals_client/UpPWModal'
import useModal from "../../hooks/useModal"
const UpPWBtn = ({id}) => {
    //window.alert(id)
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
        <button type="button" className='btn btn-primary m-1' onClick={openModal} id={id}>
          Cambiar contraseña
        </button>
        {isOpen && <UpPWModal isOpen={isOpen} onClose={closeModal} id={id} />}
      </>
    )

}

export default UpPWBtn
