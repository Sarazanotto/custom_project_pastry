import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch("http://localhost:4545/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        if (res.status === 401 || res.status === 404) {
    
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        return;
      }
      const data = await res.json();

      setUser(data);
    } catch (error) {
      console.error("Errore nel recupero utente:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedUser= localStorage.getItem('user')
    if (token && loggedUser) {
       try {
       
        const parsedUser = JSON.parse(loggedUser);
        setUser(parsedUser);
      
      } catch (e) {
        console.error('Error', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  },[]);


 const login = (userData, token) => {
   console.log(userData,'LOGIN EFFETUATO')
    
    
    setUser(userData);
    
   
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('🚪 Logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

return(
    <AuthContext.Provider value={{user,login,logout,loading}}>
        {children}
    </AuthContext.Provider>
)


};
