import line from '/linea.svg'
const Slide  = () =>{

    return (
        <section className="slide">
        <div className="position-relative flex d-flex container pt-1">
            <div className="col-8">
                <img src="personaAcostada.svg" className="" />
            </div>
            <div className="col-4">
                <p className="fs-1">¿Tienes conflictos y necesitas ayuda para resolverlos?</p>
                <p className="fs-2">¿Un familiar o amigo tuyo requiere contención?</p>
            </div>
        </div>
            <img src={line} className="" />
            </section>
    )
}

export default Slide