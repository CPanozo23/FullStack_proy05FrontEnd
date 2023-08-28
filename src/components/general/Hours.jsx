import { useEffect, useState } from 'react';
import line from '/linea.svg'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { dateLongFormat, hourFormat } from '../../helpers/dateFormat';
const Hours = () => {
    const [hoursData, setHoursData] = useState(null);
    const [datesByDay, setDatesByDay] = useState(null);
    const url = `http://localhost:4000/hours/available`;

    useEffect(() => {
        const fetchHoursData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                setHoursData(response.data.detail)
                console.log(hoursData)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchHoursData()
    }, [])

    /*
    const datesByDay = hoursData.reduce((result, date) => {
        const day = date.date.slice(0, 10); // Extraer el día (YYYY-MM-DD)
        if (!result[day]) {
            result[day] = [];
        }
        result[day].push(date.date);
        return result;
    }, {});
*/
    const backgroundColors = ['bg-verdeclaro', 'bg-celeste', 'bg-rosado']; // Colores de fondo predefinidos
    return (
        <>
            <section className="container">
                <h1>Horas disponibles</h1>
                <section className='row justify-content-center align-items-center'>
                    {hoursData?.map((day, index) => (
                        <div key={index}>
                            <p className='fs-5 fw-bold text-brown'>{dateLongFormat(day._id)}</p>
                            <div className='row'>
                                {day?.hours.map((hour, i) => {
                                    const backgroundColor = backgroundColors[i % backgroundColors.length];
                                    return (
                                        <article className={`col-5 col-lg-2 col-md-2 col-sm-3 card m-2 p-0`} key={i}>
                                            <div className={`${backgroundColor} card-img-top fs-4 py-2 text-center`}>
                                                {hourFormat(hour.startTime)} hrs
                                            </div>
                                            <div className="card-body text-center">
                                                <button type="button" className="btn btn-primary" id={hour._id}>
                                                    Agendar
                                                </button>
                                            </div>
                                        </article>
                                    );
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
export default Hours