import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Reservation from "../pages/Reservation"
import Products from "../pages/Products"

const MainRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reservation' element={<Reservation />} />
        </Routes>
    )
}

export default MainRoutes