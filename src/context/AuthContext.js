import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Asegúrate de importar PropTypes

// Crea el contexto
const AuthContext = createContext();

// Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Renderiza los hijos */}
    </AuthContext.Provider>
  );
};

// Validación de las propiedades
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validamos que 'children' es un nodo de React y es requerido
};

// Hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
