import Consultations from '../components/general/Consultations';
import Reservation_slide from '../components/general/Reservation_slide';
import reserved_online from '/reserva.svg'
const Attention = () => {
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

export default Attention