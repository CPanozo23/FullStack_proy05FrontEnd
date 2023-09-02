import line from '/linea.svg'
const SlideInfo  = () =>{

    return (

        <section id="carouselExampleAutoplaying" class=" slide-info carousel slide p-5 bg-warning" data-bs-ride="carousel">
  <article class="carousel-inner bg-primary">
    <div class="carousel-item active ">
        <div className='row container justify-content-center'>
            <div class="col-2 bg-primary">
            <img src="./perfil_cafe.svg" className='w-100' alt="" />

            </div>
      <div className='col-8 fs-4'>
        <p>La salud mental es importante porque afecta profundamente nuestra calidad de vida y bienestar emocional. Una buena salud mental nos permite manejar el estrés, mantener relaciones saludables, tomar decisiones informadas y disfrutar de una vida plena. Cuidar nuestra salud mental es esencial para enfrentar los desafíos de la vida y lograr un equilibrio emocional y psicológico.</p>
        </div>
    </div>

    </div>


    <div class="carousel-item">
    <div className='row container justify-content-center'>
      <div class="col-2 bg-primary">
            <img src="./perfil_cafe.svg" className='w-100' alt="" />

            </div>
      <div className='col-8 fs-4'>Las fobias son trastornos de ansiedad que pueden tratarse psicológicamente, como las fobias sociales, el miedo a hablar en público. A través de terapias como la terapia cognitivo-conductual, las personas pueden aprender a enfrentar y superar sus miedos irracionales, permitiéndoles llevar una vida más plena y libre de ansiedad.</div>
    </div>
    </div>
  </article>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</section>

    )
}

export default SlideInfo