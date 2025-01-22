import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirige a la página de inicio de sesión si el usuario no está autenticado
  return isAuthenticated ? children : <Navigate to="/authentication/sign-in" />;
};

// Validación de propiedades con PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // children debe ser un nodo React y es obligatorio
};

export default PrivateRoute;
