const Admin_productsUpdate = ({ productData, onClose })  => {

    const handleUpdateProduct = () =>{
        window-alert("Modifica libro...")
    }

    
    return (
        <section className="details">
            <h1>Update products</h1>
            {<div className="">
            <div className="col-3">
                <img className="w-100" src={productData.imagen} />
            </div>
            <div className="col-9">
                <h2>{productData.name}</h2>
                <p>{productData.author}</p>
                <p>{productData.category}</p>
                <p>{productData.description}</p>
                <p>${productData.price}</p>
                <button type="button" className="btn btn-primary m-2" onClick={handleUpdateProduct}>Modificar</button>
            </div>
        </div>
    }
    <button type="button" className="btn btn-primary" onClick={onClose}>Cerrar</button>
        </section>
    )

}

export default Admin_productsUpdate