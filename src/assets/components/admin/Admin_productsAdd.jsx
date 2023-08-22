import React, { useState } from "react"
import { useContext } from 'react'
import { ProductsContext } from "../../context/products/productsContext"
import { types } from "../../context/products/productsReducer"
import axios from "axios"
import { fetchProducts } from "./Admin_productsList"
const Admin_productsAdd = ({ onClose })  => {
    const [, dispatch] = useContext(ProductsContext)
    //const navigate = useNavigate()

    //1- CREAR OBJETO VACÍO
    const initialProduct = {
        name: "",
        author: "",
        category: "",
        price: "",
        discount: "",
        imagen: "",
        quantity:"",
        description: ""
    }

    //2- RECONOCER LO INGRESADO EN FORMULARIO
    const [formProduct, setFormProduct] = useState(initialProduct)

    const handleChange = (e) => {
        setFormProduct({
            ...formProduct,
            [e.target.name]: e.target.value
        })
        console.log(formProduct)
    }

    //3- BOTÓN ENVIADO
    //const [, dispatch] = useContext(UserContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
              "http://localhost:4000/products/create",
              formProduct,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
      
            dispatch({
              type: types.setProductState,
              payload: data,
            });
      
            fetchProducts(dispatch); // Actualiza la lista de productos
      
            window.alert("Libro registrado");
            onClose()
          } catch (error) {
            console.log(error);
            window.alert("Error al realizar el registro");
          }
        
        //console.log(formUser.password === formUser.passwordVerify)
    }
    return(
                <article className='justify-content-center details'>
                    
                    <div className='col-12 col-md-8'>
                        <h2 className='container'>Agregar producto</h2>
                        <form className="container p-1 p-sm-3" onSubmit={handleSubmit}>
                            <div className="input-group mb-2">
                                <label htmlFor="name" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Nombre:</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Nombre" aria-label="name" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="author" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Autor:</label>
                                <input type="text" className="form-control" id="author" name="author" placeholder="Autor" aria-label="author" required onChange={handleChange} />
                            </div>

                            <div className="input-group mb-2">
                                <label htmlFor="category" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Categoría:</label>
                                <input type="text" className="form-control" id="category" name="category" placeholder="Categoría" aria-label="category" required onChange={handleChange} />
                            </div>

                            <div className="input-group mb-2">
                                <label htmlFor="price" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Precio:</label>
                                <input type="number" className="form-control" id="price" name="price" placeholder="12345" aria-label="price" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="discount" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Descuento:</label>
                                <input type="number" className="form-control" id="discount" name="discount" placeholder="20" aria-label="discount" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="imagen" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Imagen:</label>
                                <input type="text" className="form-control" id="imagen" name="imagen" placeholder="Ingrese url imagen" aria-label="imagen" required onChange={handleChange} />
                            </div>

                            <div className="input-group mb-2">
                                <label htmlFor="quantity" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Cantidad:</label>
                                <input type="number" className="form-control" id="quantity" name="quantity" placeholder="Cantidad" aria-label="quantity" required onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <label htmlFor="description" className="input-group-text col-12 col-lg-4 col-md-5 col-sm-6 bg-verdeclaro">Descripción:</label>
                                <textarea rows="3" className="form-control" id="description" name="description" placeholder="Ingrese descripción" aria-label="description" required onChange={handleChange} />
                            </div>


                            <button type="submit" className="btn btn-primary">Registrar libro</button>
                        </form>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={onClose}>Cerrar</button>
                </article>
    )

    }

export default Admin_productsAdd