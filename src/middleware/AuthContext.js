import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform login logic, set user data, and store token in local storage
    // Example:
    // setUser(userData);
    // localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    // Perform logout logic, clear user data, and remove token from local storage
    // Example:
    // setUser(null);
    // localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    // Check if user is authenticated by verifying token or user data in local storage
    // Example:
    // return !!localStorage.getItem('token');
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
