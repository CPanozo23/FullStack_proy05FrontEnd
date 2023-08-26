/* eslint-disable react/prop-type */ 
import { UserContext } from "./userContext"
import { useReducer } from "react"
import userReducer from './userReducer'
export const UserProvider = ({children}) => {
    
    const [ user, dispatch] = useReducer(userReducer, null)
    return (
        
        <UserContext.Provider value={[user,dispatch]}>
            {children}
        </UserContext.Provider>
    )
}