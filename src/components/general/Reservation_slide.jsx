import line from '/linea.svg'
import { useState } from 'react'
import RegisterBtn from '../buttons/RegisterBtn'
import LoginBtn from '../buttons/LoginBtn'

const Reservation_slide = () => {
    return (
        <section className="bg-rosado mt-0">
            <div className="container">
                <h1 className="container fs-1">¿Quieres realizar una reserva para ti u otra persona que necesita apoyo?</h1>
                <p className='container fs-3'>¡Busca la mejor hora para atenderte según tus necesidades!</p>
            </div>
            <div className="container py-2">
                <p>Puedes gestionar tus citas y la de tus seres queridos en un mismo lugar, lo más importante es la salud mental tuya y de quienes te rodean.</p>
                <LoginBtn />
                <RegisterBtn />
            </div>
        </section>
    )
}

export default Reservation_slide