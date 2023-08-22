import React, { useContext, useEffect, useState } from "react"

//import axios from "axios"
//import { ProductsContext } from "../../context/products/productsContext"
//import { types } from "../../context/products/productsReducer"
//import Admin_productsAdd from "./Admin_productsAdd"
//import Admin_productsUpdate from "./Admin_productsUpdate"
//import Admin_productsList from "./Admin_productsList"
import Admin_availabilityAdd from "./Admin_availabilityAdd";

const Admin_reservations = () => {

    const [showAvailabilityAdd, setShowAvailabilityAdd] = useState(false);
    const handleAddButtonClick = () => {
        !showAvailabilityAdd ? setShowAvailabilityAdd(true) :""
    }
    const handleCloseAdd = () => {
        setShowAvailabilityAdd(false);
    }

    return (
        <main>
            <h1>Reservas</h1>

            {/*AGREGAR DISPONIBILIDAD*/}
            <button type="button" className="btn btn-primary" onClick={handleAddButtonClick}>Agregar Disponibilidad</button>
            {showAvailabilityAdd && 
            <div className="overlay">
                <Admin_availabilityAdd onClose={handleCloseAdd} />
            </div>}

            {/*VER LISTADO DE PRODUCTOS INMEDIATAMENTE, DEJAR EN EL FONDO AL SELECCIONAR MODIFICAR Y AGREGAR*/}
            {/*<Admin_productsList />*/}
        </main>
    )
}
export default Admin_reservations;
