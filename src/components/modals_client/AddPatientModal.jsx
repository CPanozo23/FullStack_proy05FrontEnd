import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { UserContext } from '../../context/user/userContext'
import { useNavigate } from 'react-router-dom'
import RegisterBtn from '../buttons/RegisterBtn'
import { types } from '../../context/user/userReducer'
import jwt from "jwt-decode"
import region from '../../helpers/regions'
import { inputForm_patient } from '../../helpers/inputForm_patient'
import {dateFormatYMD } from '../../helpers/dateFormat'
import { validateRun } from '../../helpers/validateRun'
import moment from 'moment'

Modal.setAppElement('#root')

export const AddPatientModal = ({ isOpen, onClose, id, setReload, patientsRelation }) => {
  const [run, setRun] = useState('')
  const [runValid, setRunValid] = useState(false)
  
  const [isFetching, setIsFetching] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const inputF = inputForm_patient
  const relationship = [
    'Soy el paciente','Padre', 'Padrastro', 'Madre','Madrastra', 'Hijo/a', 'Abuelo/a', 'Pareja', 'Tío/a', 'Primo/a', 'Sobrino/a', 'Amigo/a', 'Otro'
  ]

  const initialPatient = {
    relationship: '', run: '', name: '', lastName: '', birthday: '',
    email: '', phone: '', street: '', number_st: '',
    department: '', city: '', region: ''
  }
  const currentDate = moment()
  const formattedCurrentDate = currentDate.format('YYYY-MM-DD')

  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [disabledInputs, setDisabledInputs] = useState([])
  const [formPatient, setFormPatient] = useState(initialPatient)

  const jwtToken = sessionStorage.getItem('jwtToken')

  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [selectedComuna, setSelectedComuna] = useState(null)

  const handleRegionChange = (e) => {
    const regionName = e.target.value
    const selectedRegion = region.find((reg) => reg.region === regionName)
    setSelectedRegion(selectedRegion)
    setSelectedComuna(null)
    handleChange(e)
  }

  const handleComunaChange = (e) => {
    const comunaName = e.target.value
    setSelectedComuna(comunaName)
    handleChange(e)
  }
  
  const handleRelationChange = async (e) => {
    const relation = e.target.value
    handleChange(e)
    if(relation === 'Soy el paciente') {
    const { data } = await axios.get(`http://localhost:4000/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },})
        const fieldsToDisable = ['run', 'name', 'lastName', 'email', 'birthday']

    const disabledFields = inputF.flatMap(group =>
      Object.keys(group).flatMap(title =>
        group[title]
          .filter(input => fieldsToDisable.includes(input.name))
          .map(input => input.name)
      )
    )

    setIsInputDisabled(true)
    setDisabledInputs(fieldsToDisable)

    setFormPatient({
      ...formPatient,
      relationship:relation,
      run: data.detail.run,
      name: data.detail.name,
      lastName: data.detail.lastName,
      email: data.detail.email,
      birthday: dateFormatYMD(data.detail.birthday),
    })
      
  }else{
    setIsInputDisabled(false)
    setDisabledInputs([])
    setFormPatient({
      ...formPatient,
      relationship:relation,
      run: '', name: '', lastName: '', email: '', birthday: '',
    })
  }
}
  const handleChange = (e) => {
    if (e.target.name === 'run') {
      const input = e.target.value
      const filteredInput = input.replace(/[^0-9kK]/gi, '') 
      setRun(filteredInput)
      setFormPatient({
        ...formPatient,
        [e.target.name]: filteredInput
      })
      const newRun = e.target.value
      setRun(newRun)
      const isValid = validateRun(newRun)
      setRunValid(isValid)
    } else {
    
    setFormPatient({
      ...formPatient,
      [e.target.name]: e.target.value
    })
    console.log(formPatient)
  }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)
  
    try {
      setRunValid(false)
  
      console.log("inicia: ", runValid)
      console.log(formPatient.run)
  
      const isValid = validateRun(formPatient.run)
  
      if (!isValid) {
        Swal.fire({ icon: 'error', title: 'RUN inválido', timer: 30000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
      } else {
        console.log(patientsRelation)
        
        const isRunRegistered = patientsRelation?.some((patientRelation) => {
          return patientRelation.patientData.run === formPatient.run
        })
        
        if (isRunRegistered) {
          Swal.fire({ icon: 'error', title: 'Ya existe', text:"Ya tienes un paciente registrado con mismo RUN", timer: 30000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
        } else {
          const { data } = await axios.post(`http://localhost:4000/patients/register/${id}`, formPatient, {
        headers: {
          "Context-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
        },
      })
      Swal.fire({ icon: 'success', title: 'Paciente agregado', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
      setReload(true)
     onClose()
        }
        
        
        
        
        

      }
  
  
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error ' + error.response.status, text: 'Oops... Algo salió mal', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
    } finally {
      setIsFetching(false)
    }
  }
  
  
  //setReload(true)
  /*
  const { data } = await axios.post(`http://localhost:4000/patients/register/${id}`, formPatient, {
        headers: {
          "Context-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
        },
      })
      Swal.fire({ icon: 'success', title: 'Paciente agregado', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
    */
     // onClose()

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Agregar paciente" overlayClassName="ReactModal__Overlay__pt200"
      className="p-2 bg-white rounded-3 col-11 col-sm-11 col-md-8 col-lg-7 pt-200" >
      <h2>Agregar paciente</h2>

      <form className="container p-1 p-sm-3"name='formPatient' onSubmit={handleSubmit}>
      <div className="input-group mb-2">
          <label htmlFor="relationship" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Relación:</label>
      <select className="form-control" onChange={handleRelationChange} name='relationship' id='relationship' >
            <option value="">¿Qué es el paciente de usted?</option>
            {relationship.map((rel, index) => (<option key={index}>{rel}</option>))}
          </select>
          </div>
      {inputF.map((group, index) => (
        <div key={index}>
          {Object.keys(group).map((title) => (
            <div key={title}>
              {title==='address' ?  <p className='fw-bold'>Dirección</p> : ''}
              {group[title].map((input, inputIndex) => (
                <div key={inputIndex} className="input-group mb-2">
                  <label htmlFor={input.name} className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">
                    {input.description}:
                  </label>
                  <input type={input.type} className="form-control" id={input.name} name={input.name} placeholder={input.placeholder} required={input.required} onChange={handleChange} value={formPatient[input.name]} disabled={isInputDisabled && disabledInputs.includes(input.name)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      
        <div className="input-group mb-2">
          <label htmlFor="region" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Región:</label>
          <select className="form-control" id='region' name='region' onChange={handleRegionChange} required>
            <option value="">Seleccione región</option>
            {region.map((reg, index) => (<option key={index}>{reg.region}</option>))}
          </select>
        </div>

        <div className="input-group mb-2">
          <label htmlFor="city" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">
            Ciudad:
          </label>
          <select name='city' className="form-control" onChange={handleComunaChange} disabled={!selectedRegion} required>
            <option value="">Seleccione ciudad</option>
            {selectedRegion &&
              selectedRegion.provincias.map((provincia) =>
                provincia.comunas.map((comuna, index) => (
                  <option key={index} value={comuna.name}>
                    {comuna.name}
                  </option>
                ))
              )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mx-1" disabled={isFetching} >
          {isFetching ? 'Cargando...' : 'Agregar paciente'}
        </button>
      </form>
      Actualizar:¿mensaje de está seguro? confirmar y actualizar.
      <button type="button" onClick={onClose} className="btn btn-primary">
        Cerrar
      </button>
    </Modal>
  )
}

export default AddPatientModal
