import LoginModal from '../modals/LoginModal'
import useModal from "../../hooks/useModal"
const LoginBtn = () => {
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
            <button type="button" className='btn btn-primary m-1' onClick={openModal}>Iniciar sesión</button>
            {isOpen && (
                <LoginModal isOpen={isOpen} onClose={closeModal} />
            )}
        </>
    )

}

export default LoginBtn
