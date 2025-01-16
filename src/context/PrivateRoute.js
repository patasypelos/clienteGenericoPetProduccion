import { Route, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext"; // Usamos el contexto de autenticación
import PropTypes from 'prop-types'; // Asegúrate de importar PropTypes


// Componente para proteger las rutas
const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Verificar si el usuario está autenticado

  return isAuthenticated ? element : <Navigate to="/authentication/sign-in" />;
};

// Validación de propiedades
PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired, // Validamos que 'element' es un React Element y es requerido
  };

export default PrivateRoute;
