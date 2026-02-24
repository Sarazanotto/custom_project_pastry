import { useState, useCallback } from "react";
import { message } from "antd";

const API_URL = import.meta.env.VITE_SERVER_URL;

const useQuote = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  // Ottieni tutti i preventivi dell'utente
  const fetchUserQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quotes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Errore nel caricamento dei preventivi");
      }

      const data = await res.json();
      setQuotes(data.quotes || []);
      return data;
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile caricare i preventivi");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crea nuovo preventivo
  const createQuote = async (quoteData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(quoteData),
      });

      if (!res.ok) {
        throw new Error("Errore nella creazione del preventivo");
      }

      const data = await res.json();
      message.success("Preventivo creato con successo!");
      await fetchUserQuotes(); // ricarica lista
      return data;
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile creare il preventivo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Aggiorna preventivo
  const updateQuote = async (quoteId, quoteData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quotes/${quoteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(quoteData),
      });

      if (!res.ok) {
        throw new Error("Errore nell'aggiornamento del preventivo");
      }

      const data = await res.json();
      message.success("Preventivo aggiornato!");
      await fetchUserQuotes(); // ricarica lista
      return data;
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile aggiornare il preventivo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Conferma preventivo
  const confirmQuote = async (quoteId) => {
    setLoading(true);
    try {
      console.log("Confermando preventivo:", quoteId);
      
      const res = await fetch(`${API_URL}/quotes/${quoteId}/confirm`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ confirm: true }), // ✅ IMPORTANTE!
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Errore response:", errorData);
        throw new Error(errorData.message || "Errore nella conferma del preventivo");
      }

      const data = await res.json();
      console.log("Preventivo confermato:", data);
      
      message.success("Preventivo confermato!");
      await fetchUserQuotes(); // ricarica lista
      return data;
    } catch (error) {
      console.error("Errore conferma:", error);
      message.error("Impossibile confermare il preventivo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Rifiuta preventivo
  const rejectQuote = async (quoteId) => {
    setLoading(true);
    try {
      console.log("Rifiutando preventivo:", quoteId);
      
      const res = await fetch(`${API_URL}/quotes/${quoteId}/confirm`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ confirm: false }), // ✅ IMPORTANTE!
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Errore response:", errorData);
        throw new Error(errorData.message || "Errore nel rifiuto del preventivo");
      }

      const data = await res.json();
      console.log("Preventivo rifiutato:", data);
      
      message.success("Preventivo rifiutato");
      await fetchUserQuotes(); // ricarica lista
      return data;
    } catch (error) {
      console.error("Errore rifiuto:", error);
      message.error("Impossibile rifiutare il preventivo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Elimina preventivo
  const deleteQuote = async (quoteId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quotes/${quoteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Errore nell'eliminazione del preventivo");
      }

      message.success("Preventivo eliminato!");
      await fetchUserQuotes(); // ricarica lista
      return await res.json();
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile eliminare il preventivo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    quotes,
    fetchUserQuotes,
    createQuote,
    updateQuote,
    confirmQuote,  // ✅ Export
    rejectQuote,   // ✅ Export  
    deleteQuote,
  };
};

export default useQuote;