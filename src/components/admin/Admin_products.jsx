import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { ProductsContext } from "../../context/products/productsContext"
import { types } from "../../context/products/productsReducer"
const Admin_products = () => {
    const [products, dispatch] = useContext(ProductsContext);
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
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
                })
            }
        }

        fetchData()
    }, [dispatch])

    const handleViewDetails = (productData) => {

    }
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
                    Stock: ${productData.quantity} <br />
                    Vendidos: {productData.sold} <br />
                    Estado: Venta normal
                </div>
                <div className="col-12">
                    {productData.description}
                </div>
                </div>
                <div className="col-1">
                    <img src={productData.imagen} alt="" className="w-100" />
                    <button type="button" className="btn btn-primary m-2" onClick={() => handleViewDetails(productData)}>Editar</button>
                    <button type="button" className="btn btn-primary m-2">Borrar</button>
                </div>
            </article>


        )
    })

    return (
        <main>
            <h1 className="text-cafe w-100 text-center">Libros</h1>
            <section className="container">
                {productsList}
            </section>
            {selectedProduct && (
                <div className="overlay">
                    {/*<button type="button" className="btn btn-link close-button" onClick={() => setSelectedProduct(null)} >❌</button>*/}
                    <div className="details row">
                        <div className="col-3">
                            <img className="w-100" src={selectedProduct.imagen} />
                        </div>
                        <div className="col-9">
                            <h2>{selectedProduct.name}</h2>
                            <p>{selectedProduct.author}</p>
                            <p>{selectedProduct.category}</p>
                            <p>{selectedProduct.description}</p>
                            <p>${selectedProduct.price} <button type="button" className="btn btn-primary m-2">Agregar</button></p>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => setSelectedProduct(null)}>Cerrar</button>
                    </div>
                </div>
            )}
        </main>
    );
}
export default Admin_products;
