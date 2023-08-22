/* eslint-disable react/prop-type */ 
//HOC // HIGHER ORDER COMPONENT
//HOOK
import React from "react"
import { ProductsContext } from "./productsContext"
import { useReducer } from "react"
import productsReducer from './productsReducer'
export const ProductsProvider = ({children}) => {
    const [products, dispatch] = useReducer(productsReducer, { products: [], error: null });

    return (
        <ProductsContext.Provider value={[products,dispatch]}>
            {children}
        </ProductsContext.Provider>
    )
}