import { useContext, useState } from 'react'
import { UserContext } from '../context/user/userContext'
import line from '/linea.svg'
import { NavLink, useNavigate } from "react-router-dom"
import jwt from "jwt-decode"
import { parseISO, differenceInYears }  from 'date-fns'

const Register = () => {
    const [, dispatch] = useContext(UserContext)
    const navigate = useNavigate()

    //1- CREAR OBJETO VACÍO
    const initialUser = {
        run: "",
        name: "",
        lastName: "",
        birthday: "",
        email: "",
        password: "",
        passwordVerify: ""
    }

    //2- RECONOCER LO INGRESADO EN FORMULARIO
    const [formUser, setFormUser] = useState(initialUser)

    const handleChange = (e) => {
        setFormUser({
            ...formUser,
            [e.target.name]: e.target.value
        })
        console.log(formUser)
    }

    //3- BOTÓN ENVIADO
    const handleSubmit = async (e) => {
        e.preventDefault()
        //primero verificar que la edad sea mayor a 18 años
        const age = differenceInYears(new Date(), parseISO(formUser.birthday));
        if (age >= 18) {
            //console.log('La persona tiene al menos 18 años.', edad);
            if (formUser.password === formUser.passwordVerify){
                //4- CONECTARSE Y CREAR OBJETO
                console.log("Crear usuario...")
                
                //window.alert("Usuario registrado")
                //navigate('/login')
            
            }else{
                //5- CLAVE NO VERIFICADA QUE SEA IGUAL
                console.log("No ingresó la misma clave")
            }
        } else {
            console.log('Debe tener al menos 18 años', age);
        }


        //console.log(formUser.password === formUser.passwordVerify)
    }
    return (
        <main className='mt-2'>
            <section className="container ">
                <article className='row justify-content-center'>
                    <div className='bg-light col-12 col-md-4 d-flex flex-column border rounded '>
                        <img src="persona-pc.svg" className='mt-auto' />
                    </div>
                    <div className='col-12 col-md-8'>
                        <h2 className='container'>Registro de usuario</h2>
                        <form className="container p-1 p-sm-3" onSubmit={handleSubmit}>
                            <div className="input-group mb-2">
                                <label htmlFor="run" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">RUN:</label>
                                <input type="text" className="form-control" id="run" name="run" placeholder="Ingrese su run" aria-label="run" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="name" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Nombre:</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Ingrese su nombre" aria-label="name" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="lastName" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Apellido:</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Ingrese su apellido" aria-label="lastName" required onChange={handleChange} />
                            </div>

                            <div className="input-group mb-2">
                                <label htmlFor="birthday" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Fecha de nacimiento:</label>
                                <input type="date" className="form-control" id="birthday" name="birthday" aria-label="birthday" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="email" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">E-mail:</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Ingrese su email" aria-label="email" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="password" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Contraseña:</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Ingrese su contraseña" aria-label="password" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="passwordVerify" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Verifique Contraseña:</label>
                                <input type="password" className="form-control" id="passwordVerify" name="passwordVerify" placeholder="Ingrese nuevamente" aria-label="passwordVerify" required onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Registrarse</button>
                        </form>
                    </div>

                </article>
            </section>
            <img src={line} className="" />
        </main>
    )
}

export default Register