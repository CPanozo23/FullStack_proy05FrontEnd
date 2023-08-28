import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Hours from '../components/general/Hours'
const AttentionAdd = () => {
    const { id } = useParams()
    //window.alert(id)
    const [attentionData, setAttentionData] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)

    const url = `http://localhost:4000/consultations/${id}`

    const patients = ['Cecilia Panozo', 'Andrea Díaz', 'Otra persona']
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                setAttentionData(response.data.detail);
                console.log(response.data.detail)
                setDataLoaded(true)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData()
    }, [id])

    return (
        <main className=''>
            <section className='bg-celeste p-4'>
                {dataLoaded ? (
                    <>
                        <h1 className='fs-1 m-0 mx-5'>{attentionData.name}</h1>
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
                                <label htmlFor="patient" className="input-group-text col-12 col-lg-4 col-sm-12 bg-brown text-white">Paciente</label>
                                <select className="form-control col-12 col-lg-8 col-sm-6 " id='patient' name='patient' required>
                                    <option value="">Seleccione paciente</option>
                                    {patients.map((patient, index) => (<option key={index}>{patient}</option>))}
                                </select>
                            </div>
                        </div>
                        </article>
                    </>
                ) : 'Cargando...'}
            </section>
            <Hours />
        </main>
    )
}

export default AttentionAdd