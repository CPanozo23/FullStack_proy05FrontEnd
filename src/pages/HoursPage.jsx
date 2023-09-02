import { useContext, useEffect, useState } from 'react'
import jwt from "jwt-decode"
import axios from 'axios'
import AvailableHours from '../components/general/AvailableHours'
import { ReservationContext } from '../context/reservation/reservationContext'
import { types } from '../context/reservation/reservationReducer'
import { useNavigate } from 'react-router-dom'
import { dateFormatDMY, hourFormat } from '../helpers/dateFormat'
import { urlGeneral } from '../helpers/connect_db'
import { UserContext } from '../context/user/userContext'

export const HoursPage = () => {
    const [reload, setReload] = useState(false)

    const navigate = useNavigate()
    const [patientsData, setPatientsData] = useState(null)
    const [reservationState, reservationDispatch] = useContext(ReservationContext)

    const jwtToken = sessionStorage.getItem('jwtToken')
    const [dataLoaded, setDataLoaded] = useState(false)
    const [consultationsData, setConsultationsData] = useState(null)

    const urlConsultations = `${urlGeneral}consultations/`


    const handleHourSelection = async (id_hour) => {
        if (jwtToken !== null) {
            const id_patient = document.getElementById('patient').value
            if (!id_patient) {
                Swal.fire({ title: 'Seleccione a un paciente', icon: 'info', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
            }else{
            const id_consultation = document.getElementById('consultation').value
            if (!id_consultation) {
                Swal.fire({ title: 'Seleccione tipo de consulta', icon: 'info', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
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

                        const hour_date = hourFormat(resp?.data.detail.startTime)
                        const day_date = dateFormatDMY(resp?.data.detail.startTime)
                        const consult = consultationsData.find(consultation => consultation._id === id_consultation);
                        const attention_name = consult?.name
                        const attention_price = consult?.price
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
                if (jwtToken !== null) {
                    const tokenDecodificado = jwt(jwtToken)
                    const userId = tokenDecodificado._id
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
                    icon: 'error',
                    title: 'Error '+error.response.status,
                    text: 'Oops... Algo salió mal',
                    timer: 3000,
                    timerProgressBar: true,
                    confirmButtonColor: '#1E90FF',
                })
            }
        }

        const fetchConsultationsData = async () => {
            try {
                const response = await axios.get(urlConsultations, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                setConsultationsData(response.data.detail)
            } catch (error) {
                console.error('Error fetching user data:', error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error '+error.response.status,
                    text: 'Oops... Algo salió mal',
                    timer: 3000,
                    timerProgressBar: true,
                    confirmButtonColor: '#1E90FF',
                })
            }
        }

        fetchConsultationsData()

        fetchUserData()
    }, [])

    useEffect(() => {
        if (reload) {
          navigate(`/hours`)
          setReload(false)
        }
      }, [reload, navigate])
      
    return (
        <main className=''>
            <section className='bg-verdeclaro p-4 row'>
                <article className='col-12 col-lg-6 col-md-6 col-sm-12'>
                    <div className="input-group ">
                        <label htmlFor="patient" className=" col-12 col-lg-4 col-sm-12 input-group-text  bg-brown text-white">Tipo de atención</label>
                        <select className="form-control col-3" id='consultation' name='consultation' required>
                            <option value="">Seleccione atención</option>
                            {consultationsData?.map((consultation, index) => {
                                return (
                                    <option key={index} value={consultation._id}>{consultation.name} {consultation.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</option>
                                )
                            })}
                        </select>
                    </div>
                </article>
                <article className='col-12 col-lg-6 col-md-6 col-sm-12'>
                    <div className="input-group ">

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
                </article>
            </section>
            <AvailableHours onHourSelect={handleHourSelection} reload={reload} />
        </main>
    )
}

export default HoursPage