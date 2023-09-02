import { useEffect, useState } from 'react'
import line from '/linea.svg'
import axios from 'axios'
import { dateLongFormat, hourFormat } from '../../helpers/dateFormat'
import { urlGeneral } from '../../helpers/connect_db'
const AvailableHours = ({ onHourSelect, reload }) => {
    const [hoursData, setHoursData] = useState(null)
    const url = `${urlGeneral}hours/available`

    useEffect(() => {
        const fetchHoursData = async () => {
          try {
            const response = await axios.get(url, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log(response.data.detail)
            setHoursData(response.data.detail)
          } catch (error) {
            console.error('Error fetching user data:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error ' + error.response.status,
              text: 'Oops... Algo salió mal',
              timer: 3000,
              timerProgressBar: true,
              confirmButtonColor: '#1E90FF',
            });
          }
        };
        fetchHoursData();
        if (reload) {
          fetchHoursData();
        }
      }, [reload])

    const handleAgendar = (hourId) => {
        onHourSelect(hourId)
    }
    const backgroundColors = ['bg-verdeclaro', 'bg-celeste', 'bg-rosado']
    return (
        <>
            <section className="container">
                <h1>Horas disponibles</h1>
                <section className='row justify-content-center align-items-center'>
                    {hoursData?.map((day, index) => (
                        <div key={index}>
                            <p className='fs-5 fw-bold text-brown'>{dateLongFormat(day.hours[0].startTime)}</p>
                            <div className='row'>
                                {day?.hours.map((hour, i) => {
                                    const backgroundColor = backgroundColors[i % backgroundColors.length]
                                    return (
                                        <article className={`col-5 col-lg-2 col-md-2 col-sm-3 card m-2 p-0`} key={i}>
                                            <div className={`${backgroundColor} card-img-top fs-4 py-2 text-center`}>
                                                {hourFormat(hour.startTime)} hrs
                                            </div>
                                            <div className="card-body text-center">
                                                <button type="button" className="btn btn-primary" id={hour._id} onClick={() => handleAgendar(hour._id)}>
                                                    Agendar
                                                </button>
                                            </div>
                                        </article>
                                    )
                                })}

                            </div>
                        </div>
                    ))}
                </section>
            </section>
            <img src={line} className="" />
        </>
    )
}
export default AvailableHours