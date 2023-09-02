import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { types } from '../../context/user/userReducer';
import jwt from "jwt-decode"
import { urlGeneral } from '../../helpers/connect_db'
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)

    try {
        const { data } = await axios.post(`${urlGeneral}users/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const tokenDecoded = jwt(data.token)


      sessionStorage.setItem('jwtToken', data.token)

      dispatch({
        type: types.setUserState,
        payload: tokenDecoded,
      })
      Swal.fire({
        title: '¡Bienvenido!',
        icon: 'success',
        timer: 2000,
        confirmButtonColor: '#1E90FF',
        timerProgressBar: true,
    })
    window.location.reload()
    } catch (error) {
      if (error.response && error.response.status) {
        Swal.fire({
          icon: 'error',
          title: 'Error ' + error.response.status,
          text: 'Ingrese de nuevo usuario y contraseña',
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: '#1E90FF',
        })
      } else {
        console.error('Error de solicitud:', error);
      }
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

      <button type="button" onClick={onClose} className="btn btn-primary">
        Cerrar
      </button>
    </Modal>
  )
}

export default LoginModal
