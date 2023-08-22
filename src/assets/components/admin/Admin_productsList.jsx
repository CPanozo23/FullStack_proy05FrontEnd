import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { ProductsContext } from "../../context/products/productsContext"
import { types } from "../../context/products/productsReducer"
import Admin_productsUpdate from "./Admin_productsUpdate"

export const fetchProducts = async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      dispatch({
        type: types.setProductsState,
        payload: response.data.detail,
      });
    } catch (error) {
      dispatch({
        type: types.setError,
        payload: error,
      });
    }
  };

const Admin_productsList = () => {
    const [showProductsUpdate, setShowProductsUpdate] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [products, dispatch] = useContext(ProductsContext);

    const handleUpdateButtonClick = (productData) => {
        setSelectedProduct(productData)
        setShowProductsUpdate(true)
    }
    const handleCloseUpdate = () => {
        setSelectedProduct(null)
        setShowProductsUpdate(false)
    }

    const handleDeleteButtonClick = (id) =>{
        window-alert(`Elimina libro ${id}`)
    }
    
    useEffect(() => {
        fetchProducts(dispatch)
      }, [dispatch])

    const productsList = products.products.map(productData => {
        return (
            <article className="row m-1 border" key={productData._id}>
                <div className="row col-11">
                <div className="col-4">
                    {productData.name} <br />
                    {productData.author}<br />
                    {productData.category}
                </div>
                <div className="col-4">
                    Precio: ${productData.price} <br />
                    Dcto: {productData.discount}% <br />
                    Precio Venta:${productData.price}
                </div>
                <div className="col-4">
                    Stock: {productData.quantity} <br />
                    Vendidos: {productData.sold} <br />
                    Estado: Venta normal
                </div>
                <div className="col-12">
                    {productData.description}
                </div>
                </div>
                <div className="col-1">
                    <img src={productData.imagen} alt="" className="w-100" />
                    <button type="button" className="btn btn-primary" onClick={() => handleUpdateButtonClick(productData)}>Editar</button>
                    {showProductsUpdate && 
                    <div className="overlay">
                    <Admin_productsUpdate productData={selectedProduct} onClose={handleCloseUpdate} />
                    
                    
                </div>}
                <button type="button" className="btn btn-primary" onClick={() => handleDeleteButtonClick(productData._id)}>Eliminar</button>
                </div>
            </article>


        )
    })

    return(
        <main>
            <h1 className="text-cafe w-100 text-center">Libros</h1>
            <section className="container">
                {productsList}
            </section>
            
        </main>
        
    )

    }

export default Admin_productsList