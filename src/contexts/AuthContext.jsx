import React, { createContext, useContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const history = useHistory();
  const [authInfo, setAuthInfo] = useLocalStorage('s11d2', {});
  const isLoggedIn = authInfo && authInfo.token;

  const initAuth = (authFormData) => {
    axios
      .post(
        'https://nextgen-project.onrender.com/api/s11d2/login',
        authFormData
      )
      .then((response) => {
        console.log('Login successful:', response);
        setAuthInfo(response.data);
        history.push('/friends');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  /*const login = (username, password) => {
    return axios
      .post('https://nextgen-project.onrender.com/api/s11d2/login', {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          setIsLoggedIn(true);
          setAuthUserInfo(response.data);
          return true;
        } else {
          setIsLoggedIn(false);
          return false;
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setIsLoggedIn(false);
        return false;
      });
  };*/
  const logOut = () => {
    setAuthInfo({});
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authInfo, initAuth, isLoggedIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
