import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { ProductsContext } from "../../context/products/productsContext"
import { types } from "../../context/products/productsReducer"
import Admin_productsAdd from "./Admin_productsAdd"
import Admin_productsUpdate from "./Admin_productsUpdate"
import Admin_productsList from "./Admin_productsList"
const Admin_products = () => {

    const [showProductsAdd, setShowProductsAdd] = useState(false);
    const handleAddButtonClick = () => {
        !showProductsAdd ? setShowProductsAdd(true) :""
    }
    const handleCloseAdd = () => {
        setShowProductsAdd(false);
    }

    return (
        <main>
            <h1>Productos</h1>

            {/*AGREGAR UN PRODUCTO*/}
            <button type="button" className="btn btn-primary" onClick={handleAddButtonClick}>Agregar libro</button>
            {showProductsAdd && 
            <div className="overlay">
                <Admin_productsAdd onClose={handleCloseAdd} />
            </div>}

            {/*VER LISTADO DE PRODUCTOS INMEDIATAMENTE, DEJAR EN EL FONDO AL SELECCIONAR MODIFICAR Y AGREGAR*/}
            <Admin_productsList />
        </main>
    )
}
export default Admin_products;
