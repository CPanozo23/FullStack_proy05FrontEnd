import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user/userContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import jwt from "jwt-decode";
import UpEmailBtn from '../components/buttons_client/UpEmailBtn';
import UpPWBtn from '../components/buttons_client/UpPWBtn';

const Dashboard_client = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [state, ] = useContext(UserContext);
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
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                setUserData(response.data.detail);
                console.log(response.data.detail)
                setDataLoaded(true); // Indica que los datos se han cargado
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [url, jwtToken]);
function dateFormat(dateF){
    const date = new Date(dateF.toLocaleString("en-US", { timeZone: "America/Santiago" }))
    const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript van de 0 a 11
const year = date.getFullYear();

const formattedDate = `${day}-${month}-${year}`;

console.log(formattedDate);

return formattedDate
}
    return (
        <main>
            <section className='container'>
                {state?.user ? (
                    <>
                        <h1>Bienvenid@ {state.user.name} {state.user.lastName}</h1>
                        {dataLoaded ? (
                            <article className='border row'>
                            
                                <div className='col'>RUN: {userData?.run}</div>
                                <div className='col'>Email: {userData?.email}</div>
                                <div className='col'>Fecha de nacimiento: {dateFormat(userData?.birthday)}</div>
                                <div className='col'>
                                    <UpEmailBtn id={userData?._id}/> pasar el id
                                    <UpPWBtn id={userData?._id}/> pasar el id
                                </div>
                            </article>
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                        <p>Agregar pacientes</p>
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
