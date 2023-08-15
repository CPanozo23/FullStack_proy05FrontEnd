import React, { useContext } from "react";
import { UserContext } from "../../context/user/userContext";
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const [, dispatch] = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    try{
        dispatch({
            type: "LOGOUT",
          });
          navigate(`/login`)
    }catch{
        window.alert('Error cerrar sesión')

        dispatch({
            type:types.setError,
            payload: error,
        })
    }
    

    

  };

  return (
    <button onClick={handleLogout} type="button" className="btn btn-primary">Cerrar sesión</button>
  );
};

export default Logout;