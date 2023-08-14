import Bestseller from '../components/general/Bestseller'
import line from '/linea.svg'
import { NavLink } from "react-router-dom"
const Login = () => {

    return (
        <div className='mt-2'>
            <section className="container ">
                <article className='row justify-content-center'>
                    <div className='bg-light col-12 col-md-4 d-flex flex-column border rounded '>
                        <img src="persona-pc.svg" className='mt-auto' />
                    </div>
                    <div className='col-12 col-md-8'>
                        <h2 className='container'>Inicio de Sesión</h2>
                        <form className="container p-1 p-sm-3">
                            <div className="input-group mb-2">
                                <label htmlFor="email" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">E-mail:</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Ingrese su email" aria-label="email" required />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="password" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Contraseña:</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Ingrese su contraseña" aria-label="password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Ingresar</button>
                        </form>
                        <p className='mx-3'>¿No estás registrado? <NavLink className="nav-link" aria-current="page" to="/register">Regístrate aquí</NavLink></p>
                    </div>

                </article>
                
            </section>
            
            <img src={line} className="" />
            <Bestseller />
        </div>
        
    )
}

export default Login