import RegisterModal from '../modals/RegisterModal'
import useModal from "../../hooks/useModal"
const RegisterBtn = () => {
  const { isOpen, openModal, closeModal } = useModal()
return(
    <>
    <button type='button' className='btn btn-primary mx-1' onClick={openModal}>Crear cuenta</button>
      <RegisterModal isOpen={isOpen} onClose={closeModal} />
            </>
)

}

export default RegisterBtn
