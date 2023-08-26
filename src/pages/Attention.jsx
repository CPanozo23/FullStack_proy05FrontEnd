import Reservation_slide from '../components/general/Reservation_slide';
import reserved_online from '/reserva.svg'
const Attention = () => {
    return (
        <main>
            <section className="p-4 bg-celeste">

            <h1 className="text-center">Atención Psicológica Online</h1>
            <article className=" d-flex flex-wrap justify-content-center align-items-center">

                <div className='col-4'>
                <img src={reserved_online} className='w-100' />
                <img src="/mercado-pago.png" className='w-100 p-5' />
                </div>
                <div className='col card p-2'>
                    <div className=''>
                    <li>Sesiones de 45 minutos por Zoom.</li>
                <li>Puedes conectarte desde computador, tablet o tu celular.</li>
                <li>30 minutos antes de la consulta recibirás un SMS y un email con el enlace para acceder</li>
                    </div>
                
                <p className='fw-bold'>Valores por consulta</p>
                <li>Primera sesión: $30.000</li>
                <li>Desde segunda sesión:</li>
                <ul>
                <li>Particular: $30.000</li>
                <li>FONASA: $20.000 (*)</li>
                <li>Estudiantes de Educación Superior: $20.000 (*)</li>
                </ul>
                <p>Boleta: Una vez realizada la atención, se enviará la boleta de honorarios al correo electrónico o teléfono que hayas indicado, en un plazo máximo de 24 horas.</p>
                <p className='fw-bold'>(*) Personas con Fonasa, estudiantes de educación superior, o que requieran un valor más accesible, se verá su situación en la primera sesión para solicitar cupo de arancel diferenciado.</p>
                </div>
            
                
                
            </article>
            
            </section>
            <Reservation_slide />
        </main>
    );
}

export default Attention