export const types = {
    setProductState: '[PRODUCT] Set Product State',
    setProductsState: '[PRODUCTS] Set Products State',
    setError: '[PRODUCTS] Set Error',
}
const productsReducer = (state, action = {}) => {
    switch (action.type) {
        case types.setProductState:
            return {
                ...state,
                user: action.payload,
            }
        case types.setProductsState: 
            return {
                ...state,
                products: action.payload,
            };
        case types.setError:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}
export default productsReducer