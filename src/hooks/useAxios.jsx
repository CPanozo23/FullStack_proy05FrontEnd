import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { types } from '../context/user/userReducer';
import { UserContext } from '../context/user/userContext';

function useAxios(page, user) {
  const url = 'http://localhost:4000/';

  const [state, dispatch] = useContext(UserContext);

  console.log(page);
  console.log(user);
  console.log(url);

  const fetchData = async () => {
    try {
      // Define error y loading dentro del alcance de fetchData
      let error = null;
      let loading = true;

      switch (page) {
        case 'users/login':
          console.log('aquii');
          try {
            const { data } = await axios.post(url + page, user, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const tokenDecodificado = jwt(data.token);
            console.log('tokenDecodificado');
            console.log(tokenDecodificado);

            dispatch({
              type: types.setUserState,
              payload: tokenDecodificado,
            });
            window.alert('Usuario logueado');
          } catch (err) {
            console.error('Error fetching data:', err);
            error = err;
          } finally {
            loading = false;
          }

          break;

        default:
          break;
      }

      // Actualiza el estado con los valores de error y loading
      // dispatch(setErrorAction(error));
      // dispatch(setLoadingAction(loading));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Invoca fetchData después de definirla
  fetchData();
}

export default useAxios;
