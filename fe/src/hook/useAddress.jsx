import { useState,useCallback } from "react";
import { message } from "antd";

const API_URL = import.meta.env.VITE_SERVER_URL;

const useAddress = () => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);

  // Ottieni tutti gli indirizzi
  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/address`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Errore nel caricamento degli indirizzi");
      }

      const data = await res.json();
      setAddresses(data.addresses || []);
      return data;
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile caricare gli indirizzi");
      throw error;
    } finally {
      setLoading(false);
    }
  },[]);

  // Crea nuovo indirizzo
  const createAddress = async (addressData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) {
        throw new Error("Errore nella creazione dell'indirizzo");
      }

      const data = await res.json();
      message.success("Indirizzo creato!");
      await fetchAddresses(); // ricarica lista
      return data;
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile creare l'indirizzo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Aggiorna indirizzo
  const updateAddress = async (addressId, addressData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/address/${addressId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) {
        throw new Error("Errore nell'aggiornamento dell'indirizzo");
      }

      const data = await res.json();
      message.success("Indirizzo aggiornato!");
      await fetchAddresses(); // ricarica lista
      return data;
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile aggiornare l'indirizzo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Elimina indirizzo
  const deleteAddress = async (addressId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/address/${addressId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Errore nella rimozione dell'indirizzo");
      }

      message.success("Indirizzo eliminato!");
      await fetchAddresses(); // ricarica lista
      return await res.json();
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile rimuovere l'indirizzo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addresses,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
  };
};

export default useAddress;
