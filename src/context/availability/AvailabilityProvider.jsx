/* eslint-disable react/prop-type */ 
//HOC // HIGHER ORDER COMPONENT
//HOOK
import React from "react"
import { AvailabilityContext } from "./availabilityContext"
import { useReducer } from "react"
import availabilityReducer from './availabilityReducer'
export const AvailabilityProvider = ({children}) => {
    const [availability, dispatch] = useReducer(availabilityReducer, { availability: [], error: null });

    return (
        <AvailabilitiesContext.Provider value={[availability,dispatch]}>
            {children}
        </AvailabilitiesContext.Provider>
    )
}