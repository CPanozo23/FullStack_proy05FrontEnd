import reserved_online from '/reserva.svg'
const Attention = () => {
    return (
        <main>
            <section className="py-4 bg-celeste">

            <h1 className="text-cafe w-100 text-center">Atención Psicológica Online</h1>
            <article className=" row">
                <div className='col-6 bg-primary'>
                <img src={reserved_online} className='w-100' />
                </div>
                <div className='col-6 bg-secondary'>
                <p>Sesiones de 45 minutos por Zoom</p>
                <p>Puedes conectarte desde computador, tablet o tu celular.</p>
                <p>30 minutos antes de la consulta recibirás un SMS y un email con el enlace para acceder</p>
                <h2>Valores por consulta</h2>
                <p>Primera sesión: $30.000</p>
                <p>Desde segunda sesión:</p>
                <li>Particular: $30.000</li>
                <li>FONASA: $20.000 (*)</li>
                <li>Estudiantes de Educación Superior: $20.000 (*)</li>
                
                </div>
            
                <p>(*) Personas con Fonasa, estudiantes de educación superior, o que requieran un valor más accesible, se verá su situación en la primera sesión para solicitar cupo de arancel diferenciado</p>
                <p>Boleta: Una vez realizada la atención, se enviará la boleta de honorarios al correo electrónico o teléfono que hayas indicado, en un plazo máximo de 24 horas.</p>
            </article>
            
            </section>
        </main>
    );
}

export default Attention