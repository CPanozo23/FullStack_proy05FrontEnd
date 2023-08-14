/* eslint-disable react/prop-type */ 
//HOC // HIGHER ORDER COMPONENT
//HOOK
import React from "react"
import { UserContext } from "./userContext"
import { useReducer } from "react"
import userReducer from './userReducer'
export const UserProvider = ({children}) => {
    //const [ user, dispatch] = useReducer(userReducer, null)
    const [user, dispatch] = useReducer(userReducer, { users: [], error: null });

    return (
        <UserContext.Provider value={[user,dispatch]}>
            {children}
        </UserContext.Provider>
    )
}