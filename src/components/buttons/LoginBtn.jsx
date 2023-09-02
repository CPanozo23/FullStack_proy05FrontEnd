import LoginModal from '../modals/LoginModal'
import useModal from "../../hooks/useModal"
const LoginBtn = () => {
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <button type='button' className='btn btn-primary mx-1' onClick={openModal}>Iniciar sesión</button>
            <LoginModal isOpen={isOpen} onClose={closeModal} />
        </>

    )

}

export default LoginBtn
