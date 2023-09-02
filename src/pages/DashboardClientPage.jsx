import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user/userContext'
import { useContext, useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import jwt from "jwt-decode"
import UserInfo from './dashboard_client/UserInfo'
import PatientList from './dashboard_client/PatientList'
import { urlGeneral } from '../helpers/connect_db'
const Dashboard_client = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [patientsData, setPatientsData] = useState(null)
    const [patientsRelation, setPatientsRelation] = useState(null)
    const [reservationData, setReservationData] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)

    const [state,] = useContext(UserContext)
    const jwtToken = sessionStorage.getItem('jwtToken')

    const [reload, setReload] = useState(false)

    if (!jwtToken) {
        return <Navigate to="/" />
    }

    const tokenDecodificado = jwt(jwtToken)
    const userId = tokenDecodificado._id
    const url = `https://caro-back.onrender.com/users/${userId}`

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resp = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })

                setUserData(resp.data.detail)
                setPatientsData(resp.data.patients)
                setReservationData(resp.data.reservationsList)
                const listPatients = await resp.data.detail.patients.map((patient) => ({
                    relationship: patient.relationship,
                    patientData: resp.data.patients.find((patientSearch) => patientSearch._id === patient._id),

                }))

                resp.data.reservationsList.forEach(item => {
                })
                setPatientsRelation(listPatients)
                setDataLoaded(true)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchUserData()
    }, [url, jwtToken])

    useEffect(() => {
        if (reload) {
          navigate('/dashboard-client')
          setReload(false)
        }
      }, [reload, navigate])

    return (
        <main>
            <section className='container'>
                {state?.user ? (
                    <>
                        {dataLoaded ? (
                            <UserInfo userData={userData} setReload={setReload} patientsRelation={patientsRelation} />
                        ) : (<p>Cargando datos de usuario...</p>)}
                        <hr />

                    </>
                ) : null}
            </section>
            <section className='container'>

                {dataLoaded ? (
                    (patientsRelation.length===0 ? 'No hay pacientes agregados':
                    <PatientList patientsRelation={patientsRelation} reservationData={reservationData} />
                    )
                ) : (
                    <p>Cargando datos de pacientes...</p>
                )}
            </section>
        </main>
    )
}

export default Dashboard_client