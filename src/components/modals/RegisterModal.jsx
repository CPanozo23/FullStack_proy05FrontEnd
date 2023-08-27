import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { parseISO, differenceInYears } from 'date-fns'
import { UserContext } from '../../context/user/userContext'
import { types } from '../../context/user/userReducer'
import axios from "axios"
import jwt from "jwt-decode"
//VERIFICAR SI RUN ES RUN
//VERIFICAR SI EXISTE UN USUARIO CON MISMO RUN Y/O EMAIL 

Modal.setAppElement('#root')
const RegisterModal = ({ isOpen, onClose }) => {
  const [isFetching, setIsFetching]=useState(false)
  const [, dispatch] = useContext(UserContext)
  const navigate = useNavigate()
    const jwtToken = sessionStorage.getItem('jwtToken');

  const initialUser = {
    run: "", name: "", lastName: "", birthday: "", email: "", password: "", passwordVerify: ""
  }

  const [formUser, setFormUser] = useState(initialUser)
  const handleChange = (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    })
    console.log(formUser)
  }

  //3- BOTÓN ENVIADO
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const age = differenceInYears(new Date(), parseISO(formUser.birthday));
    if (age >= 18) {
      if (formUser.password === formUser.passwordVerify) {
        console.log("Crear usuario...")
        try {
          //mandar form
          const { data } = await axios.post('http://localhost:4000/users/signup', formUser, {
            headers: {
              "Context-Type": "application/json",
            },
          })

          sessionStorage.setItem('jwtToken', data.token)
          const tokenDecodificado=jwt(data.token)
          console.log(tokenDecodificado)
          dispatch({
              type:types.setUserState,
              payload:tokenDecodificado
          })

          window.alert("Usuario registrado")
          navigate("/dashboard-client")
          onClose()
        } catch (error) {
          console.log(error);
          window.alert("Error al registrar el usuario")
          dispatch({
            type: types.setError,
            payload: error,
          })
        }finally{
    setIsFetching(false)
        }
         console.log(formUser)
    setFormUser(initialUser)
  
      } else {
        console.log("No ingresó la misma clave")
      }
    } else {
      console.log('Debe tener al menos 18 años', age);
    }
  }

  return (
    <Modal
      isOpen={isOpen} onRequestClose={onClose} contentLabel="Iniciar sesión"
      overlayClassName="ReactModal__Overlay"
      className="p-2 bg-white rounded-3 col-11 col-sm-11 col-md-8 col-lg-7" >
      <h2>Crear cuenta</h2>
      <form className="container p-1 p-sm-3" onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <label htmlFor="run" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">RUN:</label>
          <input type="text" className="form-control" id="run" name="run" placeholder="Ingrese su run" aria-label="run" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="name" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Nombre:</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Ingrese su nombre" aria-label="name" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="lastName" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Apellido:</label>
          <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Ingrese su apellido" aria-label="lastName" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="birthday" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Fecha de nacimiento:</label>
          <input type="date" className="form-control" id="birthday" name="birthday" aria-label="birthday" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="email" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">E-mail:</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Ingrese su email" aria-label="email" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="password" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Contraseña:</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Ingrese su contraseña" aria-label="password" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="passwordVerify" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Verifique Contraseña:</label>
          <input type="password" className="form-control" id="passwordVerify" name="passwordVerify" placeholder="Ingrese nuevamente" aria-label="passwordVerify" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isFetching} >
        {isFetching?'Cargando...':'Registrarse'}
        </button>
        
      </form>
      <button type="button" onClick={onClose} className="btn btn-primary mx-1">
          Cerrar
        </button>
    </Modal>
  )
}

export default RegisterModal
