import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { ProductsContext } from "../context/products/productsContext"
import { types } from "../context/products/productsReducer"
const Products = () => {
    const [products, dispatch] = useContext(ProductsContext)
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
        setSelectedProduct(productData);
    }

    const productsList = products.products.map(productData => {
        return (
            <article className="card col-8 col-sm-6 col-md-4 col-lg-3 m-1" key={productData._id}>
                <img src={productData.imagen} alt="" className="rounded" />
                <div className="card-body">
                    <h5 className="card-title">{productData.name}</h5>
                    <p className="card-text">{productData.author}</p>
                    <p className="card-text">${productData.price}</p>
                    <button type="button" className="btn btn-primary m-2" onClick={() => handleViewDetails(productData)}>Ver</button>
                    <button type="button" className="btn btn-primary m-2">Agregar</button>
                </div>
            </article>


        )
    })

    return (
        <main>
            <h1 className="text-cafe w-100 text-center">Libros</h1>
            <section className="container d-flex flex-wrap justify-content-center align-items-center">
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

export default Products