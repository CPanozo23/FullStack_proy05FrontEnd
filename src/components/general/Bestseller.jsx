const Bestseller = () => {
    const libros = [
        { id: 1, name: "Nombre del libro ASD", author: "Nombre del autor", price: "79990", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 10 },
        { id: 2, name: "Nombre del libro ASD", author: "Nombre del autor", price: "99990", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 12 },
        { id: 3, name: "Nombre del libro ASD", author: "Nombre del autor", price: "89990", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 1 },
        { id: 4, name: "Nombre del libro ASD", author: "Nombre del autor", price: "79490", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 6 },
        { id: 5, name: "Nombre del libro ASD", author: "Nombre del autor", price: "39890", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 3 },
        { id: 6, name: "Nombre del libro ASD", author: "Nombre del autor", price: "29490", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 12 },
        { id: 7, name: "Nombre del libro ASD", author: "Nombre del autor", price: "9190", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 9 },
        { id: 8, name: "Nombre del libro ASD", author: "Nombre del autor", price: "17990", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 2 },
        { id: 9, name: "Nombre del libro ASD", author: "Nombre del autor", price: "28390", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 4 },
        { id: 10, name: "Nombre del libro ASD", author: "Nombre del autor", price: "56990", imagen: "https://i5.walmartimages.com/asr/f7283093-6e36-4008-bd4c-98c898c9f0e5.9e2376b28cb01694e4461659e1f4897c.jpeg", sold: 6 },
    ]

    const tresMasVendidos = libros.sort((a, b) => b.sold - a.sold).slice(0, 3);
    return (
        <section id="bestseller">
        <article className="d-flex justify-content-center arriba bg-verdeclaro pb-5">
  <div className="container d-flex flex-wrap justify-content-center align-items-center">
    <h1 className="text-cafe w-100 text-center">Lo más vendido</h1>
    
    {tresMasVendidos.map(libro =>
      <div className="card col-8 col-sm-6 col-md-4 col-lg-3 m-1" key={libro.id}>
        <img src={libro.imagen} alt="" className="rounded" />
        <div className="card-body">
          <h5 className="card-title">{libro.name}</h5>
          <p className="card-text">{libro.author}</p>
          <p className="card-text">${libro.price}</p>
          <a href="#" className="btn btn-primary">Agregar</a>
        </div>
      </div>
    )}
    
  </div>
  </article>
  <article className="bg-verdeclaro text-center pb-3">
  <button type="button" className="btn btn-primary">Ver todos los libros</button>
  </article>
  
</section>
    )
}

export default Bestseller