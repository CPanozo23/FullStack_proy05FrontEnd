import { useEffect, useState } from 'react';
import line from '/linea.svg'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { urlGeneral } from '../../helpers/connect_db';
const Consultations = () => {
    const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realizar la solicitud a la URL
    axios.get('https://caro-back.onrender.com/consultations/')
      .then((response) => {
        // Cuando la solicitud sea exitosa, establecer el mensaje en el estado
        setMessage(response.data.message);
      })
      .catch((error) => {
        // Manejar errores aquí si es necesario
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        // Indicar que la solicitud ha terminado
        setLoading(false);
      });
  }, []); 
    return (
        <div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <p>Mensaje desde el backend: {message}</p>
        )}
      </div>
    )
}

export default Consultations