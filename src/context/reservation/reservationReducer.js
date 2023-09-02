export const types = {
  setReservationState: '[RESERVATION] Set Reservation State',
  addReservation: '[RESERVATION] Add Reservation',
  setError: '[RESERVATION] Set Error',
  resetReservations: '[RESERVATION] Reset Reservations',
  removeReservation: '[RESERVATION] Remove Reservation'
}


const reservationReducer = (state, action = {}) => {
  switch (action.type) {
    case types.setReservationState:
      return [
        ...state,
        ...action.payload,
      ]
    case types.addReservation:
      return [
        ...state,
        action.payload,
      ]
    case types.setError:
      return [
        ...state,
        action.payload,
      ]

    case types.resetReservations:
      return []
      case types.removeReservation:
        const indexToRemove = action.payload.index
        return state.filter((_, index) => index !== indexToRemove)
    default:
      return [state]
  }
}

export default reservationReducer
