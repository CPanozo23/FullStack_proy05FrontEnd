import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AvailableHours from '../components/general/AvailableHours'
import { UserContext } from '../context/user/userContext'
import jwt from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { ReservationContext } from '../context/reservation/reservationContext'
import { types } from '../context/reservation/reservationReducer'
import { dateFormatDMY, hourFormat } from '../helpers/dateFormat'
import { urlGeneral } from '../helpers/connect_db'

const AttentionAdd = () => {
    const { id } = useParams()
    const [attentionData, setAttentionData] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [patientsData, setPatientsData] = useState(null)
    const url = `${urlGeneral}consultations/${id}`
    const [state, dispatch] = useContext(UserContext)
    const [reservationState, reservationDispatch] = useContext(ReservationContext);
    const jwtToken = sessionStorage.getItem('jwtToken')
    const navigate = useNavigate()
    const [reload, setReload] = useState(false)

    const handleHourSelection = async (id_hour) => {
        if (jwtToken !== null) {
            const id_patient = document.getElementById('patient').value
            if (!id_patient) {
                Swal.fire({ title: 'Seleccione a un paciente', icon: 'info', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
            } else {
                console.log("token:", jwtToken)
                const urlHour = `${urlGeneral}hours/update`
                const newState = 'pending'
                try {
                    const resp = await axios.put(urlHour, { id_hour, newState }, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    })
                    if (resp.status === 200) {

                        const id_consultation = id 
                        const hour_date = hourFormat(resp?.data.detail.startTime)
                        const day_date = dateFormatDMY(resp?.data.detail.startTime)
                        const attention_name = attentionData?.name
                        const attention_price = attentionData?.price
                        const patient_name = document.getElementById('patient').options[document.getElementById('patient').selectedIndex].text;
    
                        const reservation = {
                            id_patient, id_hour, id_consultation, patient_name, hour_date, day_date, attention_name, attention_price
                        }
    
                        reservationDispatch({
                            type: types.addReservation,
                            payload: reservation,
                        })
                        setReload(true)
    
                        Swal.fire({
                            title: 'Hora agregada', icon: 'success', showCancelButton: true, confirmButtonColor: '#50C878', cancelButtonColor: '#FF8080', confirmButtonText: 'Ir a pagar', cancelButtonText: 'Seleccionar otra hora'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/carshop");
                              } else 
                                if (result.dismiss === Swal.DismissReason.cancel) {
                                setReload(!reload);
                              }
                        })
                    }


                    

                } catch (error) {
                    console.error('Error fetching user data:', error)
                    Swal.fire({
                        icon: 'error', title: 'Error ' + error.response.status, text: 'Oops... Algo salió mal', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF',
                    })
                }
            }
        } else {
            Swal.fire({
                title: '¡Primero debe iniciar sesión!', icon: 'info', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF',
            })
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                setAttentionData(response.data.detail)
                if (jwtToken !== null) {
                    const tokenDecoded = jwt(jwtToken)
                    const userId = tokenDecoded._id
                    const urlPatient = `${urlGeneral}users/${userId}/patients`
                    const resp = await axios.get(urlPatient, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    })
                    setPatientsData(resp.data.detail)
                }
                setDataLoaded(true)
            } catch (error) {
                console.error('Error fetching user data:', error)
                Swal.fire({
                    icon: 'error', title: 'Error ' + error.response.status, text: 'Oops... Algo salió mal', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF',
                })
            }
        }
        fetchUserData()
    }, [id])

    useEffect(() => {
        if (reload) {
          navigate(`/attention/${id}`)
          setReload(false)
        }
      }, [reload, navigate])

    return (
        <main className=''>
            <section className='bg-celeste p-4'>
                {dataLoaded ? (
                    <>
                        <h1 className='fs-1 m-0 mx-5' id='attention_name'>{attentionData.name}</h1>
                        <p className='fs-5 m-0 mx-5 border-bottom border-primary'>{attentionData.description}</p>
                        <article className='d-block d-sm-flex'>
                            <div className="col-12 col-lg-4 col-md-5 col-sm-6 px-5">
                                <p className="fs-5 my-1 fw-bold text-brown">
                                    Duración: {attentionData.duration} minutos <br />
                                    Valor: {attentionData.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                </p>
                            </div>
                            <div className=' d-block d-md-flex col-12 col-lg-8 col-md-7 col-sm-6 px-3 py-2'>
                                <div className="input-group mb-2">

                                    {patientsData ?
                                        <>
                                            <label htmlFor="patient" className="input-group-text col-12 col-lg-4 col-sm-12 bg-brown text-white">Paciente</label>
                                            <select className="form-control col-12 col-lg-8 col-sm-6" id='patient' name='patient' required>
                                                <option value="">Seleccione paciente</option>
                                                {patientsData.map((patient, index) => (
                                                    <option key={index} value={patient._id}>{patient.name} {patient.lastName}</option>
                                                ))}
                                            </select>

                                        </>
                                        : ''}
                                </div>
                            </div>
                        </article>
                    </>
                ) : 'Cargando...'}
            </section>

            <AvailableHours onHourSelect={handleHourSelection} reload={reload} />

        </main>
    )
}

export default AttentionAdd