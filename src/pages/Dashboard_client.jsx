import {useContext, useEffect} from 'react'
import {UserContext} from "../context/user/userContext"
import Customer_general from '../components/customer/Customer_general'
import { useNavigate } from 'react-router-dom'

const Dashboard_client = () => {
    const [user, ] = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (user === null) {
          navigate('/login');
        }
      }, [user, navigate]);
    return(
        <section>
            <h1>Dashboard_client</h1>
            
            {(user) ? (<div>
                {JSON.stringify(user, null, 2)}
                    <Customer_general />
                </div>
                
                ) : (<div><p>Usuario no disponible</p></div>)}

        </section>
    )
}

export default Dashboard_client