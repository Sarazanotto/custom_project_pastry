import { createContext, useState, useEffect, use } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLogged(true);
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    setUser(user);
    setIsLogged(true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    localStorage.removeItem("user");
  };

  const updateUser = (update) => {
    const newUser = { ...user, ...update };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLogged,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
