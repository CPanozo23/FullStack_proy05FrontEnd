import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user/userContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import jwt from "jwt-decode";
import UpEmailBtn from '../components/buttons_client/UpEmailBtn';
import UpPWBtn from '../components/buttons_client/UpPWBtn';
import AddPatientBtn from '../components/buttons_client/AddPatientBtn';
import { dateFormatDMY } from '../helpers/dateFormat';
import { getReservationInfo } from '../helpers/reservation_date';

const Dashboard_client = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [patientsData, setPatientsData] = useState(null);
    const [patientsRelation, setPatientsRelation] = useState(null);
    const [reservationData, setReservationData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [state,] = useContext(UserContext);
    const jwtToken = sessionStorage.getItem('jwtToken');
    const now = new Date()
    if (!jwtToken) {
        return <Navigate to="/" />;
    }

    const tokenDecodificado = jwt(jwtToken);
    const userId = tokenDecodificado._id;
    const url = `http://localhost:4000/users/${userId}`;

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
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData()
    }, [url, jwtToken])

    return (
        <main>
            <section className='container'>
                {state?.user ? (
                    <>
                        {dataLoaded ? (
                            <article className='row'>
                                <div className='py-2 col align-items-center bg-warning'>
                                    <h1 className='m-0 align-items-center bg-primary'>Bienvenid@ {state.user.name} {state.user.lastName}</h1>
                                </div>
                                <div className='col row align-items-center text-end p-0 m-0'>
                                    <div className='col fw-bold p-0 m-0 text-end'>{userData?.run}</div>
                                    <div className='col fw-bold p-0 m-0'>🗓️ {dateFormatDMY(userData?.birthday)}</div>
                                    <div className='col fw-bold p-0 m-0'>✉️ {userData?.email}</div>
                                    <div className='p-0 text-end'>
                                        <AddPatientBtn id={userData?._id} />
                                        <UpPWBtn id={userData?._id} />
                                        <UpEmailBtn id={userData?._id} />
                                    </div>
                                </div>
                            </article>
                        ) : (<p>Cargando datos de usuario...</p>)}
                        <hr />
                        {dataLoaded ? (
                            <article>
                                <p className='fs-3'>Pacientes</p>
                                {patientsRelation?.map((patientRelation, index) => (
                                    <div className='row' key={index}>
                                        <div className='col-2 border'>{patientRelation.relationship}</div>

                                        {patientRelation.patientData && (
                                            <>
                                                <div
                                                 className='col-2 border'>   {patientRelation.patientData.name} {patientRelation.patientData.lastName}
                                                </div>
                                               
                                                {reservationData?.map(item => {
  if (item.id_patient === patientRelation.patientData._id) {
    
    const {reservationsFuture, totalReservationsPassed } = getReservationInfo(item.reservations)

    return (
      <div className='col-6 border d-flex' key={item.id_patient}>
        <div className='col-4 border'>
          Reservas pasadas: {totalReservationsPassed}
        </div>
        <div className='col-4 border'>
          Próxima:
          {reservationsFuture.map((reservation, index) => (
            <span key={index}>{reservation.hour.startTime}</span>
          ))}
        </div>

        <div className='col border'>
      <button className='btn btn-primary m-1' id={item.id_patient}>Ver historial</button>
  </div>
 
  </div>
    )
  } else {
    return null
  }
})}

  

                                            
                                                <div className='col border'>
                                                    
                                                    <button className='btn btn-primary m-1' id={patientRelation.patientData.id}>Actualizar información</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}

                            </article>
                        ) : (
                            <p>Cargando datos de pacientes...</p>
                        )}
                    </>
                ) : null}
            </section>
        </main>
    );
};

export default Dashboard_client;
