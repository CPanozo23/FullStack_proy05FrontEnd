export const types = {
    setUserState: '[USER] Set User State',
    setError: '[USER] Set Error',
    //setUserState : 'SETUSER',
}


const userReducer = (state, action = {}) => {
    switch (action.type) {
        case types.setUserState:
            return {
                ...state,
                user: action.payload,
            }
        case types.setError:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default userReducer