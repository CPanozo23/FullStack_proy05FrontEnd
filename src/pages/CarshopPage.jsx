import { useContext, useState, useEffect } from 'react'
import { ReservationContext } from '../context/reservation/reservationContext'
import { types } from '../context/reservation/reservationReducer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Carshop = () => {
  const [reservationState, dispatch] = useContext(ReservationContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const jwtToken = sessionStorage.getItem('jwtToken')

  useEffect(() => {
    const newTotalPrice = reservationState.reduce((accumulator, reserva) => {
      return accumulator + parseInt(reserva.attention_price)
    }, 0)

    setTotalPrice(newTotalPrice)
  }, [reservationState])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const reservationsPromises = reservationState.map((reserva) => {
        return axios.post(
          'http://localhost:4000/reservations/register',
          {
            id_patient: reserva.id_patient,
            id_hour: reserva.id_hour,
            id_consultation: reserva.id_consultation,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
      })
  
      const reservationResponses = await Promise.all(reservationsPromises)
  
      if (reservationResponses.every((response) => response.status === 200)) {
        reservationState.forEach((_, index) => {
          dispatch({
            type: types.resetReservations,
            payload: { index },
          })
        })
  
        Swal.fire({
          title: 'Pago realizado', icon: 'success', timer: 2000, confirmButtonColor: '#1E90FF', timerProgressBar: true,
        })
        navigate('/dashboard-client')
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Se ha producido un error en una o más reservas. Intente nuevamente.', timer: 5000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({ icon: 'error', title: 'Error', text: 'Se ha producido un error en una o más reservas. Intente nuevamente.', timer: 5000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })
      dispatch({
        type: types.setError,
        payload: error,
      })
    }
  }
  

  const handleRemoveReservation = async (indexToRemove, id_hour) => {
    dispatch({
      type: types.removeReservation,
      payload: { index: indexToRemove },
    })
    const urlHour = 'http://localhost:4000/hours/update'
    const newState = 'available'
    try {
      const resp = await axios.put(urlHour, { id_hour, newState }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      navigate("/carshop")

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error', title: 'Error ', text: 'Oops... Algo salió mal', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF',
      })
    }
  }
  return (
    <main className='container'>
      <h2>Carrito de compra</h2>
      {reservationState.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <section>
          <form>
            {reservationState.map((reserva, index) => (
              <article key={index} className='border row'>
                <div className='col-1 border'>N° {index + 1}</div>
                <div className='col-3 border'>{reserva.patient_name} </div>
                <div className='col-2 border'>{reserva.day_date} {reserva.hour_date} </div>
                <div className='col-2 border'>{reserva.attention_name} </div>
                <div className='col-2 border'>
                  {reserva.attention_price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </div>
                <div className='col-2 border'> <button type="button" className='btn btn-primary' id={index} onClick={() => handleRemoveReservation(index, reserva.id_hour)} data-id={index}>Eliminar</button> </div>
              </article>
            ))}
            <article className='fw-bold'>Total: {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              <button type="button" className='btn btn-primary' onClick={handleSubmit} >Pagar</button></article>
          </form>
        </section>
      )}
    </main>
  )
}

export default Carshop
