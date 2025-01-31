// import React, { createContext, useContext, useState } from "react";
// import PropTypes from "prop-types"; // Importa PropTypes


// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [menus, setMenus] = useState([]); // Estado para las rutas disponibles

//    const login = () => setIsAuthenticated(true);


//   const logines = (newToken) => {
//     localStorage.setItem("token", newToken);
//   };

//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout,logines }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Validación de tipos con PropTypes
// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired, // children debe ser un nodo de React y es requerido
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth debe ser usado dentro de un AuthProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importa PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Verifica si el token está presente en localStorage al cargar
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Si hay un token, el usuario está autenticado
    } else {
      setIsAuthenticated(false); // Si no hay token, no está autenticado
    }
    console.log("Estado autenticación después de carga:", isAuthenticated);

  }, []); // Este effect solo se ejecuta una vez cuando se monta el componente

  const login = () => setIsAuthenticated(true);

  const logines = (newToken) => {
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true); // Después de guardar el token, el usuario está autenticado
  };

  const logout = () => {
    localStorage.removeItem("token"); // Elimina el token al cerrar sesión
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, logines }}>
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
