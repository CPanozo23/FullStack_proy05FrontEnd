import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user/userContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import jwt from "jwt-decode";
import UpEmailBtn from '../components/buttons_client/UpEmailBtn';
import UpPWBtn from '../components/buttons_client/UpPWBtn';
import AddPatientBtn from '../components/buttons_client/AddPatientBtn';
import {dateFormatDMY } from '../helpers/dateFormat';

const Dashboard_client = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [state,] = useContext(UserContext);
    const jwtToken = sessionStorage.getItem('jwtToken');

    if (!jwtToken) {
        return <Navigate to="/" />;
    }

    const tokenDecodificado = jwt(jwtToken);
    const userId = tokenDecodificado._id;
    const url = `http://localhost:4000/users/${userId}`;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
          'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                setUserData(response.data.detail);
                console.log(response.data.detail)
                if(typeof(userData?.patients)==='undefined'){
                    console.log("no hay")
                }
                setDataLoaded(true)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData()
    }, [url, jwtToken])
    /*
    function dateFormat(dateF) {
        const date = new Date(dateF.toLocaleString("en-US", { timeZone: "America/Santiago" }))
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        console.log(formattedDate);

        return formattedDate
    }*/

    //formattedDate=dateFormat(dateF)
    return (
        <main>
            <section className='container'>
                {state?.user ? (
                    <>
                        <article className='row mt-2'>
                            {dataLoaded ? (
                                <>
                                    <div className='py-2 col align-items-center bg-warning'>
                                        <h1 className='m-0 align-items-center bg-primary'>Bienvenid@ {state.user.name} {state.user.lastName}</h1>
                                    </div>
                                    <div className='col row align-items-center text-end p-0 m-0'>
                                        <div className='col fw-bold p-0 m-0 text-end'>{userData?.run}</div>
                                        <div className='col fw-bold p-0 m-0'>🗓️ {dateFormatDMY(userData?.birthday)}</div>
                                        <div className='col fw-bold p-0 m-0'>✉️ {userData?.email}</div>
                                        <div className='p-0 text-end'>
                                        <AddPatientBtn id={userData?._id}/>
                                        <UpPWBtn id={userData?._id} />
                                        <UpEmailBtn id={userData?._id} />
                                    </div>
                                    </div>
                                    <hr />
                                    <p>Pacientes</p>
                                    <p>{(userData.patients===null)? 'no hay' : 'si hay'} ...</p>
                                </>
                            ) : (
                                <p>Cargando datos...</p>
                            )}
                            
                            
                        </article>
                        

                        <p>Modificar info pacientes</p>
                        <p>listado de pacientes</p>
                        <p>Agregar hora</p>
                        <p>Ver listado de horas</p>

                    </>
                ) : null}
            </section>
        </main>
    );
};

export default Dashboard_client;
