import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
