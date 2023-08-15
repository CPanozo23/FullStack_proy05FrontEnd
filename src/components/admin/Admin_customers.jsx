import React, { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/user/userContext";
import { types } from "../../context/user/userReducer";
import { format, differenceInYears } from "date-fns"; // Importa la función format
const Admin_customer = () => {
    const [users, dispatch] = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/users");
                dispatch({
                    type: types.setUsersState,
                    payload: response.data.detail,
                });
            } catch (error) {
                dispatch({
                    type: types.setError,
                    payload: error,
                });
            }
        };

        fetchData();
    }, [dispatch]);

    //npm install date-fns -> Para formatear fecha
    // Enlistar usuarios

    const userList = users.users.map(userData => {
        
        const birthdayDate = new Date(userData.birthday.split('T')[0])
        const formattedBirthday = format(birthdayDate, "dd-MM-yyyy")
        const age = differenceInYears(new Date(), birthdayDate)
        return (
            <article key={userData._id} className="border-bottom">
                <div className="fs-3 bg-light px-2">{userData.name} {userData.lastName}</div>
                <div className="row px-1">
                    <div className="col-6"><p>Fono: {userData.phone}<br />
                        Email: {userData.email}<br />
                        F. Nacimiento: {formattedBirthday}<br />
                        Edad: {age} años<br />
                        Dirección: {userData.address}</p>
                    </div>

                    <div className="col-4"><p>Sesiones realizadas: {userData.type}<br />
                        Compras realizadas: {userData.purchases}<br />
                        Productos comprados: {userData.products}</p>
                    </div>
                    <div className="col-2">
                    <button type="button" className="btn btn-primary my-2">Ver sesiones</button>
                    <button type="button" className="btn btn-primary my-2">Ver compras</button>
                    </div>
                </div>
            </article>
        );
    });


    return (
        <>
            <h2>Clientes</h2>
            {userList}
        </>
    );
};
export default Admin_customer;
