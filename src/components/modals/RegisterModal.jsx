import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { parseISO, differenceInYears } from 'date-fns'
import { UserContext } from '../../context/user/userContext'
import { types } from '../../context/user/userReducer'
import axios from "axios"
import jwt from "jwt-decode"
import { validateRun } from '../../helpers/validateRun'
import { handlePasswordChange } from '../../helpers/validatePassword'
import { urlGeneral } from '../../helpers/connect_db'
import inputForm_user from '../../helpers/inputForm_user'
Modal.setAppElement('#root')
const RegisterModal = ({ isOpen, onClose }) => {
  const [run, setRun] = useState('')
  const [runValid, setRunValid] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
  })

  const [isFetching, setIsFetching] = useState(false)
  const [, dispatch] = useContext(UserContext)
  const navigate = useNavigate()
  const jwtToken = sessionStorage.getItem('jwtToken')

  const initialUser = {
    run: run, name: "", lastName: "", birthday: "", email: "", password: password, passwordVerify: ""
  }

  const [formUser, setFormUser] = useState(initialUser)

  const handleChange = (e) => {
    if (e.target.name === 'run') {
      const input = e.target.value
      const filteredInput = input.replace(/[^0-9kK]/gi, '') 
      setRun(filteredInput)
      setFormUser({
        ...formUser,
        [e.target.name]: filteredInput
      })
      const newRun = e.target.value
      setRun(newRun)
      const isValid = validateRun(newRun)
      setRunValid(isValid)
    } else {
    if (e.target.name === 'password') {
      const newPassword = e.target.value
      const isValidPW = handlePasswordChange(newPassword, setPassword, setPasswordRequirements)
      setPasswordValid(isValidPW)
    }
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    })
  }
  }

  const [passwordValid, setPasswordValid] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const updatedFormUser = { ...formUser }
    const age = differenceInYears(new Date(), parseISO(formUser.birthday))
    if (age >= 18) {
      if (formUser.password === formUser.passwordVerify) {
        if (!runValid) {
          Swal.fire({ icon: 'error', title: 'RUN inválido', timer: 5000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })

        } else if (!passwordValid) {
          Swal.fire({ icon: 'error', title: 'Debe cumplir con los requisitos de contraseña', timer: 50000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })

        } else {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
          try {
            if (!passwordRegex.test(formUser.password)) {
              Swal.fire({ icon: 'error', title: 'Debe cumplir con lo solicitado en clave', timer: 5000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
            } else {
              
              const { data } = await axios.post(`${urlGeneral}users/signup`, formUser, {
                headers: {
                  "Context-Type": "application/json",
                },
              })
              sessionStorage.setItem('jwtToken', data.token)
              const tokenDecodificado = jwt(data.token)
              dispatch({
                type: types.setUserState,
                payload: tokenDecodificado
              })
              Swal.fire({ title: 'Usuario registrado', icon: 'success', timer: 2000, confirmButtonColor: '#1E90FF', timerProgressBar: true, })
              setFormUser(initialUser)
              navigate("/dashboard-client")
              onClose()
            }
          } catch (error) {
            console.log(error)
            console.log(error.response.data.code)
            if(error.response.data.code ===11000){
            Swal.fire({ icon: 'error', title:error.response.data.code, text: "Ya existe un usuario con mismo RUN o Email", timer: 5000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
          }else{
            
              Swal.fire({ icon: 'error', title:error.response.data.code, text: "Se ha producido un error, intente más tarde", timer: 5000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
          }
            dispatch({
              type: types.setError,
              payload: error,
            })
          } finally {
            setIsFetching(false)
          }
        }

      } else {
        Swal.fire({ icon: 'warning', title: 'No ingresó la misma clave', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
      }
    } else {
      Swal.fire({ icon: 'warning', title: 'Debe tener al menos 18 años', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
    }
    setIsFetching(false)
  }

  return (
    <Modal
      isOpen={isOpen} onRequestClose={onClose} contentLabel="Iniciar sesión"
      overlayClassName="ReactModal__Overlay"
      className="p-2 bg-white rounded-3 col-11 col-sm-11 col-md-8 col-lg-7" >
      <h2>Crear cuenta</h2>
      <form className="container p-1 p-sm-3" onSubmit={handleSubmit}>
        {inputForm_user.map((input, index) => (
          <div className="input-group mb-2" key={index}>
            <label htmlFor={input.name} className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro"> {input.description}: </label>
            <input type={input.type} minLength="3" className="form-control" id={input.name} name={input.name} placeholder={input.placeholder} aria-label={input.name} required={input.required} onChange={handleChange} />
          </div>
        ))}
        <div className="input-group mb-2">
          <label htmlFor="password" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Contraseña:</label>
          <input type="password" name="password" onChange={handleChange} className={passwordValid ? "form-control valid" : "form-control invalid"} placeholder="Ingrese contraseña" aria-label="password" required />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="passwordVerify" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Verifique Contraseña:</label>
          <input type="password" className="form-control" id="passwordVerify" name="passwordVerify" placeholder="Ingrese nuevamente" aria-label="passwordVerify" required onChange={handleChange} />
        </div>
        <div>
          <p className={passwordValid ? "valid-message" : "invalid-message"}>
            {passwordValid ? "Contraseña válida" : "Debe cumplir con los requisitos de contraseña:"}
          </p>
          <div className="password-requirements">
            <span className={passwordRequirements.length ? 'valid-icon' : 'invalid-icon'}>✓ Al menos 8 caracteres</span>
            <span className={passwordRequirements.uppercase ? 'valid-icon' : 'invalid-icon'}>✓ Al menos 1 letra mayúscula</span>
            <span className={passwordRequirements.lowercase ? 'valid-icon' : 'invalid-icon'}>✓ Al menos 1 letra minúscula</span>
            <span className={passwordRequirements.digit ? 'valid-icon' : 'invalid-icon'}>✓ Al menos un número</span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isFetching} >
          {isFetching ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
      <button type="button" onClick={onClose} className="btn btn-primary mx-1">
        Cerrar
      </button>
    </Modal>
  )
}
export default RegisterModal
