import { Route, Routes } from "react-router-dom"
import Home from "../pages/HomePage"
import StudiesExperience from "../pages/StudiesExperiencePage"
import Attention from "../pages/AttentionPage"
import DashboardClient from "../pages/DashboardClientPage"
import AttentionAdd from "../pages/AttentionAdd"
import HoursPage from "../pages/HoursPage"
import CarshopPage from "../pages/CarshopPage"


const MainRoutes = () => {
//<Route path='/dashboard-client' element={<Dashboard_client />} />
const jwtToken = sessionStorage.getItem('jwtToken');

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/studiesExperience' element={<StudiesExperience />} />
            <Route path='/attentions' element={<Attention />} />
            <Route path='/hours' element={<HoursPage />} />
            <Route path='/carshop' element={<CarshopPage />} />
            <Route path='/attention/:id' element={<AttentionAdd />} />

            <Route path='/*' element={<h1>Not Found</h1>} />
            
            <Route path='/dashboard-client' element={<DashboardClient/>} />

        </Routes>
        //Con el type de usuario proteger
    )
}

export default MainRoutes