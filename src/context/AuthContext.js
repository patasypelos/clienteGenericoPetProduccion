import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [menus, setMenus] = useState([]); // Estado para las rutas disponibles

   const login = () => setIsAuthenticated(true);


  const logines = (newToken) => {
    // setToken(newToken);
    // Extraer las rutas del token
    // const decodedToken = jwtDecode(newToken);
    // const availableRoutes = decodedToken.Menus ? decodedToken.Menus.split(",") : [];
    // setMenus(availableRoutes);
    localStorage.setItem("token", newToken);
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,logines }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validación de tipos con PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // children debe ser un nodo de React y es requerido
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};


