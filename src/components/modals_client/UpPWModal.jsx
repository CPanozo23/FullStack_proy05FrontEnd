import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import RegisterBtn from '../buttons/RegisterBtn'
import { types } from '../../context/user/userReducer';
import jwt from "jwt-decode"
import { urlGeneral } from '../../helpers/connect_db'

Modal.setAppElement('#root')

const UpPWModal = ({ isOpen, onClose, id }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const jwtToken = sessionStorage.getItem('jwtToken');
  const navigate = useNavigate()
  const initialUser = {
    password: "",
    passwordVerify: "",
    type:'pw'
  }

  const [formPW, setFormPW] = useState(initialUser)

  const handleChange = (e) => {
    setFormPW({
      ...formPW,type:'pw',
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)

    try {
      if(formPW.password === formPW.passwordVerify){
        const { data } = await axios.put(`https://caro-back.onrender.com/users/${id}`, formPW, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,

        },
      })

      if (data.message==='User updated') {
        const tokenDecoded = jwt(data.token)
        sessionStorage.setItem('jwtToken', data.token)
        dispatch({
          type: types.setUserState,
          payload: tokenDecoded,
        })
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizado',
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: '#1E90FF',
      })
        onClose()

      }
    }else{
      Swal.fire({
        icon: 'success',
        title: 'No coinciden las contraseñas',
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: '#1E90FF',
    })
    }
    } catch (error) {
      
      Swal.fire({
        icon: 'error',
        title: 'Error '+error.response.status,
        text: 'Oops... Algo salió mal',
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: '#1E90FF',
    })

      if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error '+error.response.status,
          text: 'La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra minúscula y una mayúscula.',
          timer: 8000,
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
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Actualizar contraseña" overlayClassName="ReactModal__Overlay"
      className="p-2 bg-white rounded-3 col-11 col-sm-11 col-md-8 col-lg-7" >
      <h2>Actualizar Contraseña</h2>
      <form className="container p-1 p-sm-3" onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <label htmlFor="password" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Contraseña:</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="A1234567" aria-label="password" required onChange={handleChange} />
        </div>
        <div className="input-group mb-2">
          <label htmlFor="passwordVerify" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Confirmar contraseña:</label>
          <input type="password" className="form-control" id="passwordVerify" name="passwordVerify" placeholder="A1234567" aria-label="password" required onChange={handleChange} />
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

export default UpPWModal
