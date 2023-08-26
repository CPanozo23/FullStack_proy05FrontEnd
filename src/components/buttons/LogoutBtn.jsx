import React, { useContext } from "react";
import { UserContext } from "../../context/user/userContext";
import { useNavigate } from "react-router-dom"
import { types } from "../../context/user/userReducer"

const LogoutBtn = () => {
  const [, dispatch] = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    try{      
        dispatch({
          type: types.LOGOUT,
          })
        window.alert('sesión cerrada')
        sessionStorage.removeItem('jwtToken')
          navigate(`/`)
    }catch{
        window.alert('Error cerrar sesión')

        dispatch({
            type:types.setError,
            payload: error,
        })
    }
  }

  return (
    <button onClick={handleLogout} type="button" className="btn btn-primary">Cerrar sesión</button>
  )
}

export default LogoutBtn