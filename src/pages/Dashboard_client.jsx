import {useContext} from 'react'
import {UserContext} from "../context/user/userContext"

const Dashboard_client = () => {
    const [user, ] = useContext(UserContext)

    return(
        <section>
            <h1>Dashboard_client</h1>
            {(user) ? (<div>
                    {JSON.stringify(user, null, 2)}
                </div>
                ) : (<div><p>Usuario no disponible</p></div>)}

        </section>
    )
}

export default Dashboard_client