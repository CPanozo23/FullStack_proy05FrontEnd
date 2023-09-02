export const getReservationInfo = (reservations) => {
    const now = new Date()
    const reservationsPassed = reservations.filter(reservation => {
        const startTime = new Date(reservation.hour.startTime)
        return startTime < now
    })
    const reservationsFuture = reservations.filter(reservation => {
        const startTime = new Date(reservation.hour.startTime)
        return startTime >= now
    })
    const nextReservation = reservationsFuture[0]
    const totalReservationsPassed = reservationsPassed.length

    return {
        reservationsFuture,
        nextReservation,
        totalReservationsPassed,
    }
}