import { useContext, useEffect } from 'react'
import { UserContext } from "../context/user/userContext"
import Customer_general from '../components/customer/Customer_general'
import { useNavigate } from 'react-router-dom'

const Dashboard_client = () => {
    const [user, ] = useContext(UserContext)
    const navigate = useNavigate()
    console.log(user.user)
    useEffect(() => {
        try{
            if (user.user === null) {
                navigate('/login')
              }else{
                if (user.user.typeUser === "admin") {
                    navigate('/dashboard-admin')
                  }
              }
        }catch{
            navigate('/login')
        }
      }, [user, navigate]);

    return (
        <section>
            {(user) ? (
            <div>
                <h1>{user.user.name} {user.user.lastName} {user.user.typeUser}</h1>
                
                <Customer_general />
                
            </div>
            ) : (<div><p>Usuario no disponible</p></div>)}
        </section>
    )
}

export default Dashboard_client