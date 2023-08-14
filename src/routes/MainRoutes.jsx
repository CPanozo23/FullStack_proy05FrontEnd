import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Reservation from "../pages/Reservation"
import Products from "../pages/Products"
import Dashboard_client from "../pages/Dashboard_client"

const MainRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/dashboard-client' element={<Dashboard_client />} />
            <Route path='/*' element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default MainRoutes