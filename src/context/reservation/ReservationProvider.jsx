/* eslint-disable react/prop-type */
import { ReservationContext } from "./reservationContext"
import { useReducer } from "react"
import reservationReducer from './reservationReducer'
export const ReservationProvider = ({children}) => {
    
    const [ reservation, dispatch] = useReducer(reservationReducer, [])
    return (
        
        <ReservationContext.Provider value={[reservation,dispatch]}>
            {children}
        </ReservationContext.Provider>
    )
}