import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/user/userContext"
import Logout from "./Logout"
const Navbar = () => {

  const [user, ] = useContext(UserContext)

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
        <NavLink className="nav-link" to="/#about">Sobre mi</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/reservation">Reservas</NavLink>
        </li>
        <li className="nav-item dropdown">
        <NavLink className="nav-link" aria-current="page" to="/products">Productos</NavLink>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        {
      (user?.users?.length > 0) ?
      ( 
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/dashboard-admin">
          Dashboard
        </NavLink>
        </li>
   
      ) : 
      ('')}
      
      </ul>
      <div>
      {//(user) ? 
      (user?.users?.length > 0) ?
      ( 
        <Logout />
      ) : 
      (<NavLink className="nav-link" aria-current="page" to="/login"><button type="button" className="btn btn-primary">Iniciar Sesión</button></NavLink>)}
      
      </div>
    </div>
  </div>
</nav>
    )
}

export default Navbar