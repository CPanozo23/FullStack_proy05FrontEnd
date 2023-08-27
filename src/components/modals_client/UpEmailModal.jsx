import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import RegisterBtn from '../buttons/RegisterBtn'
import { types } from '../../context/user/userReducer';
import jwt from "jwt-decode"

Modal.setAppElement('#root');

const UpEmailModal = ({ isOpen, onClose, id }) => {
  //window.alert("y a lo recibii:"+ id)
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
    console.log(formEmail)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('jj')
    setIsFetching(true)

    try {
      console.log(formEmail.email)
      console.log(formEmail.emailVerify)
      //1 validar que es el mismo correo
      if(formEmail.email === formEmail.emailVerify){
        //2 validar que no exista otro usuario con el mismo correo

        //window.alert(`http://localhost:4000/users/${id}`)
        window.alert(formEmail)
        //3 cambiar correo
        const { data } = await axios.put(`http://localhost:4000/users/${id}`, formEmail, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      console.log("la data: ", data)
        console.log(data)
        const tokenDecodificado = jwt(data.token)
        console.log("decodificado: ", tokenDecodificado)
        sessionStorage.setItem('jwtToken', data.token)
        dispatch({
          type: types.setUserState,
          payload: tokenDecodificado,
        })
        window.alert("Correo actualizado")
        onClose()
        //console.log(data.detail)
        //return res.status(200).json({ data })
        //return res.status(404).json({ message: 'User not found' });
        //REEMPLAZAR TOKEN POR EL EMAIL ACTUALIZADO
        /*      
    */
      

      //console.log("daaata: ", data)

      
      
    }else{
      window.alert("no coincide emails")
    } 

    } catch (error) {
      window.alert('Error login')
      window.alert("El error es "+ error.response.status)
      if (error.response.status === 400) {
        window.alert("Ya existe un usuario con ese email")
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
      Actualizar:¿mensaje de está seguro? confirmar y actualizar. Actualizar token


      <button type="button" onClick={onClose} className="btn btn-primary">
        Cerrar
      </button>
    </Modal>
  )
}

export default UpEmailModal
