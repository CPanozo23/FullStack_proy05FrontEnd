/* eslint-disable react/prop-type */ 
//HOC // HIGHER ORDER COMPONENT
//HOOK
import React from "react"
import { UserContext } from "./userContext"
import { useReducer } from "react"
import userReducer, { types } from './userReducer'
import jwt from "jwt-decode"

export const UserProvider = ({children}) => { 
    const [ user, dispatch] = useReducer(userReducer, null)
    window.alert("asd")
    useEffect(() => {
        const jwtToken = sessionStorage.getItem('jwtToken');
        if (jwtToken && !user) {
          const tokenDecodificado = jwt(jwtToken);
          dispatch({
            type: types.setUserState,
            payload: tokenDecodificado,
          });
        }
      }, [user]);
    
      return (
        <UserContext.Provider value={[user, dispatch]}>
          {children}
        </UserContext.Provider>
      )
    
}