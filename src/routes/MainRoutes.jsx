import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import StudiesExperience from "../pages/StudiesExperience"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Reservation from "../pages/Reservation"
import Attention from "../pages/Attention"
import Dashboard_client from "../pages/Dashboard_client"


const MainRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/studiesExperience' element={<StudiesExperience />} />
            <Route path='/login' element={<Login />} />
            <Route path='/attention' element={<Attention />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/dashboard-client' element={<Dashboard_client />} />
            <Route path='/*' element={<h1>Not Found</h1>} />
        </Routes>
        //Con el type de usuario proteger
    )
}

export default MainRoutes