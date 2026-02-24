const useUser = () => {
  const createUser = async (newUser) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!res.ok) {
        throw new Error(errorResponse.message);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deletUser = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error(errorResponse.message);
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
  return {
    createUser,
    updateUser,
    deletUser,
  };
};

export default useUser;
