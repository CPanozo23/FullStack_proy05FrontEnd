import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import RegisterBtn from '../buttons/RegisterBtn'
import { types } from '../../context/user/userReducer';
import jwt from "jwt-decode"

Modal.setAppElement('#root');

const UpPWModal = ({ isOpen, onClose, id }) => {
  //window.alert("y a lo recibii:"+ id)
  const [isFetching, setIsFetching] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const jwtToken = sessionStorage.getItem('jwtToken');
  console.log("el token es:", jwtToken)
  console.log("el id es:", id)
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
    console.log(formPW)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)

    try {
      if(formPW.password === formPW.passwordVerify){
        const { data } = await axios.put(`http://localhost:4000/users/${id}`, formPW, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,

        },
      })

      console.log("la data: ", data)

      if (data.message==='User updated') {
        console.log(data)
        const tokenDecodificado = jwt(data.token)
        console.log("decodificado: ", tokenDecodificado)
        sessionStorage.setItem('jwtToken', data.token)
        dispatch({
          type: types.setUserState,
          payload: tokenDecodificado,
        })
        window.alert("Contraseña actualizado")
        onClose()
        //console.log(data.detail)
        //return res.status(200).json({ data })
        //return res.status(404).json({ message: 'User not found' });
        //REEMPLAZAR TOKEN POR EL EMAIL ACTUALIZADO
        /*      
    */
      }

      //console.log("daaata: ", data)
    }else{
      window.alert("no coinciden las contraseñas")
    }
    } catch (error) {
      
      window.alert('Error PW')
      window.alert("El error es" + error.response.status)
      if (error.response.status === 400) {
        window.alert("La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra minúscula y una mayúscula.")
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
      Actualizar:¿mensaje de está seguro? confirmar y actualizar. Actualizar token


      <button type="button" onClick={onClose} className="btn btn-primary">
        Cerrar
      </button>
    </Modal>
  )
}

export default UpPWModal
