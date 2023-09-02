import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { types } from '../../context/user/userReducer';
import jwt from "jwt-decode"
import { urlGeneral } from '../helpers/connect_db'

Modal.setAppElement('#root');

const UpEmailModal = ({ isOpen, onClose, id }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const jwtToken = sessionStorage.getItem('jwtToken');

  const navigate = useNavigate()
  const initialUser = {
    email: "",
    emailVerify: "",
    type:'email'
  }

  const [formEmail, setFormEmail] = useState(initialUser)

  const handleChange = (e) => {
    setFormEmail({
      ...formEmail,type:'email',
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)

    try {
      if(formEmail.email === formEmail.emailVerify){
        const { data } = await axios.put(`${urlGeneral}/users/${id}`, formEmail, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      })

        const tokenDecoded = jwt(data.token)
        sessionStorage.setItem('jwtToken', data.token)
        dispatch({
          type: types.setUserState,
          payload: tokenDecoded,
        })
        Swal.fire({
          icon: 'success',
          title: 'Correo actualizado',
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: '#1E90FF',
      })
        onClose()
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No coincide el email',
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: '#1E90FF',
    })
    } 

    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Ya existe un usuario con ese email',
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: '#1E90FF',
      })
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
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Actualizar correo" overlayClassName="ReactModal__Overlay"
      className="p-2 bg-white rounded-3 col-11 col-sm-11 col-md-8 col-lg-7" >
      <h2>Actualizar correo</h2>
      <form className="container p-1 p-sm-3" onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <label htmlFor="email" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">E-mail:</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="nuevo_email@email.com" aria-label="email" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="emailVerify" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Confirmar E-mail:</label>
          <input type="email" className="form-control" id="emailVerify" name="emailVerify" placeholder="nuevo_email@email.com" aria-label="email" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary mx-1" disabled={isFetching} >
          {isFetching ? 'Cargando...' : 'Actualizar'}
        </button>
      </form>
      <button type="button" onClick={onClose} className="btn btn-primary">
        Cerrar
      </button>
    </Modal>
  )
}

export default UpEmailModal
