import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/user/userContext"
import Logout from "./Logout"
import LoginBtn from "../buttons/LoginBtn"
import LogoutBtn from "../buttons/LogoutBtn"
const Navbar = () => {

  const [state, ] = useContext(UserContext)
    return(
        <nav id="navbar-general" className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
    <img src="logo_cpd.svg" className="w-100" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/studiesExperience">Formación y experiencia</NavLink>
        </li>
        <li className="nav-item dropdown">
        <NavLink className="nav-link" aria-current="page" to="/attention">Atención psicológica</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/reservation">Reservas</NavLink>
        </li>      
      </ul>
      <div>
      
      {(state?.user) 
                ? <LogoutBtn />
                : <LoginBtn />  }
      </div>
    </div>
  </div>
</nav>
    )
}

export default Navbar
