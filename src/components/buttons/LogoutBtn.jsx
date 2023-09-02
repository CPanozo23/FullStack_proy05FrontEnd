import React, { useContext } from "react"
import { UserContext } from "../../context/user/userContext"
import { ReservationContext } from "../../context/reservation/reservationContext"
import { useNavigate } from "react-router-dom"
import { types } from "../../context/user/userReducer"
import { types as reservationTypes } from "../../context/reservation/reservationReducer"

const LogoutBtn = () => {
  const [, userDispatch] = useContext(UserContext)
  const [, reservationDispatch] = useContext(ReservationContext)
  const navigate = useNavigate()
  
  const handleLogout = () => {

    try {
      reservationDispatch({ type: reservationTypes.resetReservations })
      userDispatch({ type: types.LOGOUT })
    sessionStorage.removeItem('jwtToken')

    sessionStorage.removeItem('jwtToken')
      Swal.fire({ icon: 'success', title: 'Sesión cerrada', timer: 3000, timerProgressBar: true, confirmButtonColor: '#1E90FF', })

      navigate("/")

    } catch (error) {
      window.alert(error)
    }
  }

  return (
    <>
    <button onClick={handleLogout} type="button" className="btn btn-primary">Cerrar sesión</button>
    </>
    
  )
}

export default LogoutBtn
