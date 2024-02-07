import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [ctxLoad, setCtxLoad] = useState(true);
  useEffect(() => {
    let tkn = Cookies.get('token');
    if (tkn) {
      setCtxLoad(true);
      axios.post(`${process.env.API_URL}/user/verify`, { token: tkn })
        .then(response => {
          setUser(response.data.user);
          setIsAuthenticated(true);
          setCtxLoad(false);
        }).catch(err => {
          console.log(err);
          setCtxLoad(false);
        });
    }else {
      setUser(null);
      setIsAuthenticated(false);
      setCtxLoad(false);
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ctxLoad, isAuthenticated, user, setIsAuthenticated, setUser, location, setLocation }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthContext;