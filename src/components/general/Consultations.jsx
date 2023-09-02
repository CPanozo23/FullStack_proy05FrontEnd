import { useEffect, useState } from 'react';
import line from '/linea.svg'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { urlGeneral } from '../../helpers/connect_db';
const Consultations = () => {
    const [consultationsData, setConsultationsData] = useState(null);

    const url = `https://caro-back.onrender.com/consultations/`;

    useEffect(() => {
        const fetchConsultationsData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                setConsultationsData(response.data.detail)
                console.log(response.data.detail)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchConsultationsData()
    }, [url])

    const backgroundColors = ['bg-verdeclaro', 'bg-celeste', 'bg-rosado']
    return (
        <>
            <main className="">
                <h1 className='mx-5'>Tipos de atención</h1>

                <section className='row justify-content-center align-items-center'>
                    {consultationsData?.map((consultation, index) => {
                        const backgroundColor = backgroundColors[index % backgroundColors.length]

                        return (
                            <article className='col-5 col-lg-3 col-md-4 col-sm-5 card m-1 p-0 ' key={index}>
                                <div className={`${backgroundColor} card-img-top fs-2 py-3 text-center`}>
                                    {consultation.name}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Duración: {consultation.duration} minutos</h5>
                                    <p className="card-text fw-bold">{consultation.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                                    <NavLink to={`/attention/${consultation._id}`}>
                                        <button type="button" className='btn btn-primary m-1' id={consultation._id}>
                                            Buscar hora
                                        </button>
                                        </NavLink>
                                </div>
                            </article>
                        )
                    })}
                </section>
            </main>
            <img src={line} className="" />

        </>
    )
}

export default Consultations