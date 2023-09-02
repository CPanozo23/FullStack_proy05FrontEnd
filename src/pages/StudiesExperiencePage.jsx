import Studies from '../components/general/Studies'
import Experience from '../components/general/Experience'
import line from '/linea.svg'
const StudiesExperience = () => {
    return (
        <main className=''>
            <section className="pt-4 bg-verdeclaro">
                <article className="card col-11 col-sm-12 container">
                    <Studies />
                </article>
                <img src={line} className="mt-3" />
            </section>
            <section className="py-4 bg-celeste underline">
                <article className="card col-11 col-sm-12 container mt-3">
                    <Experience />
                </article>
                <img src={line} className="mt-3" />
            </section>
        </main>
    )
}

export default StudiesExperience