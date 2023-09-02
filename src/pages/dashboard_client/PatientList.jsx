import React from 'react'
import { getReservationInfo } from '../../helpers/reservation_date'
import { dateFormatDMY, hourFormat } from '../../helpers/dateFormat'
import { NavLink } from 'react-router-dom'


const PatientList = ({ patientsRelation, reservationData }) => {
    return (
        <article>
            <p className='fs-3'>Pacientes</p>
            {patientsRelation?.map((patientRelation, index) => (
                <div className='row' key={index}>
                    <div className='col-2 border'>{patientRelation.relationship}</div>

                    {patientRelation.patientData && (
                        <>
                            <div className='col-2 border'>
                                {patientRelation.patientData.name} {patientRelation.patientData.lastName} 
                            </div>
                            
                            {reservationData?.map((item) => {
  if (item.id_patient === patientRelation.patientData._id) {
    const { reservationsFuture, totalReservationsPassed } = getReservationInfo(
      item.reservations
    )

    return (
      <div className='col-6 border d-flex' key={item.id_patient}>
        <div className='col-4 border'>
          Reservas pasadas: {totalReservationsPassed}
        </div>
        <div className='col-6 border'>
        {reservationsFuture.length > 0 ? (
    <>
      {reservationsFuture
        .sort((a, b) => new Date(a.hour.startTime) - new Date(b.hour.startTime))
        .map((reservation, index) => (
          <span key={index}>
            {dateFormatDMY(reservation.hour.startTime)}{' '}
            {hourFormat(reservation.hour.startTime)}
          </span>
        ))}
    </>
  ) : (
    <span>No hay próximas sesiones.</span>
  )}
        </div>

      </div>
    )
  }
  return null // No se encontraron reservas para este paciente
})}

{reservationData?.every((item) => item.id_patient !== patientRelation.patientData._id) && (
  <div className='col-6 border d-flex fw-bold'>Sin reservas:
    <NavLink className="nav-link" aria-current="page" to={`/attentions`}><span className="fw-bold text-primary mx-2">Ver tipos de atenciones</span></NavLink>
    <NavLink className="nav-link" aria-current="page" to={`/hours`}><span className="fw-bold text-primary mx-2">Buscar hora</span></NavLink>
  </div>
)}


                        </>
                    )}
                </div>
            ))}
        </article>
    )
}

export default PatientList
