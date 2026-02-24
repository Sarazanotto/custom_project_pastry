import { useState } from "react";

const useCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCakes = async (page = 1, pageSize = 100) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cakes?page=${page}&pageSize=${pageSize}`
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
      }

      const data = await res.json();
      setCakes(data.cakes);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createCake = async (cakeData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/cakes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cakeData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
      }

      const data = await res.json();
      setCakes((prevCakes) => [...prevCakes, data.newCake]);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateCake = async (cakeId, cakeData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cakes/${cakeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cakeData),
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
      }

      const data = await res.json();
      setCakes((prevCakes) =>
        prevCakes.map((cake) => (cake._id === cakeId ? data.cake : cake))
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteCake = async (cakeId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cakes/${cakeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
      }

      const data = await res.json();
      setCakes((prevCakes) =>
        prevCakes.filter((cake) => cake._id !== cakeId)
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    cakes,
    loading,
    fetchCakes,
    createCake,
    updateCake,
    deleteCake,
  };
};

export default useCakes;