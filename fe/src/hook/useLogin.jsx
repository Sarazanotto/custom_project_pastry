import { useState } from "react";

const URL = import.meta.env.VITE_SERVER_URL;

const useLogin = () => {
  const [authData, setAuthData] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authIsLoading, setAuthIsLoading] = useState(false);

  const loginAndGetToken = async (body) => {
    setAuthIsLoading(true);
    setAuthError(null);

    try {
      const response = await fetch(`http://localhost:4545/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const data = await response.json();

      const profileResponse = await fetch(`http://localhost:4545/profile`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!profileResponse.ok) {
        throw new Error("Errore nel recupero profilo");
      }

      const userData = await profileResponse.json();

      const result = {
        token: data.token,
        user: userData,
      };

      setAuthData(result);
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthIsLoading(false);
    }
  };
  const clearAuth = () => {
    setAuthData(null);
    setAuthError(null);
  };
  return {
    authIsLoading,
    authData,
    authError,
    loginAndGetToken,
    clearAuth,
  };
};

export default useLogin;
