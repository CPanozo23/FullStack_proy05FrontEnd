import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import RegisterBtn from '../buttons/RegisterBtn'
import { types } from '../../context/user/userReducer';
import jwt from "jwt-decode"

Modal.setAppElement('#root');

const LoginModal = ({ isOpen, onClose }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate()
  const initialUser = {
    email: "",
    password: ""
  }

  const [user, setUser] = useState(initialUser)

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    console.log(user)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    console.log("en submit")

    try {
        const { data } = await axios.post('http://localhost:4000/users/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log("daaata: ", data)
      const tokenDecodificado = jwt(data.token)
      console.log("decodificado: ", tokenDecodificado)

      dispatch({
        type: types.setUserState,
        payload: tokenDecodificado,
      })
      window.alert('Usuario logueado')
      console.log('tokenDecodificado')
      console.log(tokenDecodificado)
      navigate(`/dashboard-client`)      
    } catch (error) {
      window.alert('Error login')
      dispatch({
        type: types.setError,
        payload: error,
      })
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Iniciar sesión" overlayClassName="ReactModal__Overlay"
      className="p-2 bg-white rounded-3 col-11 col-sm-11 col-md-8 col-lg-7" >
      <h2>Iniciar sesión</h2>
      <form className="container p-1 p-sm-3" onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <label htmlFor="email" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">E-mail:</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Ingrese su email" aria-label="email" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="password" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Contraseña:</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Ingrese su contraseña" aria-label="password" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary mx-1" disabled={isFetching} >
          {isFetching ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
      <RegisterBtn />

      <button type="button" onClick={onClose} className="btn btn-primary">
        Cerrar
      </button>
    </Modal>
  )
}

export default LoginModal
