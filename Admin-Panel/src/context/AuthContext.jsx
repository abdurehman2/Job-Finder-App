import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useContext, useCallback, createContext } from 'react';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Function to handle login
  const login = useCallback(
    (userData) => {
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      setToken(userData.token);
    },
    [] // No dependencies needed here
  );

  // Function to handle logout
  const logout = useCallback(() => {
    alert("You've been logged out");
    navigate('/');
    setUser(null);
    localStorage.removeItem('token');
  }, [navigate]);

  // Derive isAuthenticated from the user state
  const isAuthenticated = !!user;

  // Specify dependencies explicitly for the context value
  const contextValue = useMemo(
    () => ({
      user,
      token,
      login,
      isAuthenticated,
      logout,
    }),
    [user, login, isAuthenticated, logout, token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Create custom hook for using the context
export const useAuth = () => useContext(AuthContext);
