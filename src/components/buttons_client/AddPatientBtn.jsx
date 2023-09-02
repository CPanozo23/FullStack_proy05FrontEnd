import AddPatientModal from '../modals_client/AddPatientModal'
import useModal from "../../hooks/useModal"
const AddPatientBtn = ({id, setReload, patientsRelation}) => {
    //window.alert(id)
    const { isOpen, openModal, closeModal } = useModal()
    return (
        <>
        <button type="button" className='btn btn-primary m-1' onClick={openModal} id={id}>
          Agregar paciente
        </button>
        {isOpen && <AddPatientModal isOpen={isOpen} onClose={closeModal} id={id} setReload={setReload} patientsRelation={patientsRelation}/>}
      </>
    )

}

export default AddPatientBtn
