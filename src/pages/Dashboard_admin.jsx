import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user/userContext'
import { useContext, useEffect } from 'react'

const Dashboard_admin = () => {
    const navigate = useNavigate()


    const [state, ] = useContext(UserContext)
    console.log(state)

    /*
    if (state === null) {
     return (
 
       <Navigate to="/"/>
       )
    }
    */
    
    return (
        <main>
            <section>
                {(state?.user) ? <h1>Bienvenid@ {state.user.email}</h1> : '' }
            </section>
        </main>
    )
}
export default Dashboard_admin