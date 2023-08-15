import Slide from "../components/general/Slide"
import About from "../components/general/About"
import Bestseller from "../components/general/Bestseller"
import { useContext } from "react"
import { UserContext } from "../context/user/userContext"

const Home = () => {
    const [user, ] = useContext(UserContext)

    return(
        <main data-bs-spy="scroll" data-bs-target="#navbar-general" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
            {(user) ? (<div>
                    {JSON.stringify(user, null, 2)}
                </div>
                ) : (<div><p>Usuario no disponible</p></div>)}
            <Slide />
            <About id="about" />
            <Bestseller />
        </main>
    )
}

export default Home