export const types = {
    setUserState: '[USER] Set User State',
    setUsersState: '[USERS] Set Users State',
    setError: '[USER] Set Error',
    LOGOUT: "[USER] Logout",
}
const userReducer = (state, action = {}) => {
    switch (action.type) {
        case types.setUserState:
            return {
                ...state,
                user: action.payload,
            }
        case types.setUsersState: //PROBANDO PARA OBTENER TODOS LOS USUARIOS
            return {
                ...state,
                users: action.payload,
            };
        case types.setError:
            return {
                ...state,
                error: action.payload,
            }
        case types.LOGOUT:
            return {
                ...state,
                user: null, // Eliminar la información del usuario al cerrar sesión
            };
        default:
            return state;
    }
}
export default userReducer