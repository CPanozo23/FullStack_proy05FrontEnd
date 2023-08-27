import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import StudiesExperience from "../pages/StudiesExperience"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Reservation from "../pages/Reservation"
import Attention from "../pages/Attention"
import Dashboard_client from "../pages/Dashboard_client"
import Dashboard_admin from "../pages/Dashboard_admin"


const MainRoutes = () => {
//<Route path='/dashboard-client' element={<Dashboard_client />} />
const jwtToken = sessionStorage.getItem('jwtToken');

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/studiesExperience' element={<StudiesExperience />} />
            <Route path='/login' element={<Login />} />
            <Route path='/attention' element={<Attention />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/*' element={<h1>Not Found</h1>} />

            
            <Route path='/dashboard-client' element={<Dashboard_client/>} />

            <Route path='/dashboard-admin' element={<Dashboard_admin />} />

        </Routes>
        //Con el type de usuario proteger
    )
}

export default MainRoutes