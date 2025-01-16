import { Route, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

// Componente para proteger las rutas
const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Verificar si el usuario está autenticado

  return isAuthenticated ? element : <Navigate to="/authentication/sign-in" />;
};

export default PrivateRoute;
