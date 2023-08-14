import Slide from "../components/general/Slide"
import About from "../components/general/About"
import Bestseller from "../components/general/Bestseller"
import { useContext } from "react"
import { UserContext } from "../context/user/userContext"

const Home = () => {
    const [user, ] = useContext(UserContext)

    return(
        <main>
            {(user) ? (<div>
                    {JSON.stringify(user, null, 2)}
                </div>
                ) : (<div><p>Usuario no disponible</p></div>)}
            <Slide />
            <About />
            <Bestseller />
        </main>
    )
}

export default Home