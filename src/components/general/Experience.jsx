import { experience_info } from '../../helpers/experience_info'
const Experience = () => {

    return (
        <div className="" id="">
            <section className="">
                <h1>Experiencia</h1>
                {experience_info.map((exps, index) => (
                    <article>
                        <div className='row' key={index}>
                            <div key={index} className='col-1'>
                                <img src={exps.img} className='profileImg' />
                            </div>
                            <div className='col'>
                                <h2>{exps.name}</h2>
                                <h3>{exps.date}</h3>
                            </div>
                        </div>

                        <div className='row justify-content-center'>
                            {exps.experience.map((exp, i) => (
                                <div key={i} className='px-3 mt-2 card col-md-5 col-11 m-2 bg-light'>
                                    <h5>{exp.title}</h5>
                                    <h6>{exp.site}</h6>
                                    <h6>{exp.date}</h6>
                                    <p>{exp.description}</p>
                                </div>
                            ))}
                        </div>


                    </article>
                ))}
            </section>

        </div>
    )
}

export default Experience