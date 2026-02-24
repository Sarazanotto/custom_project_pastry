import { useState, useCallback } from "react";
import { message } from "antd";

const useAdminOrders = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    page: 1,
    pageSize: 10,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const fetchAllQuotes = useCallback(
    async (customFilters = {}) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: customFilters.page || filters.page,
          pageSize: customFilters.pageSize || filters.pageSize,
        });

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/quotes/admin/all?${params}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Errore nel caricamento degli ordini");
        }

        const data = await res.json();

        let filteredQuotes = data.quotes || [];
        const statusFilter = customFilters.status || filters.status;

        if (statusFilter && statusFilter !== "all") {
          filteredQuotes = filteredQuotes.filter(
            (q) => q.status === statusFilter,
          );
        }

        setQuotes(filteredQuotes);
        setPagination({
          total: data.totalQuotes,
          totalPages: data.totalPages,
        });

        return data;
      } catch (error) {
        console.error("Errore:", error);
        message.error("Impossibile caricare gli ordini");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  const updateQuoteWithEmail = async (quoteId, updateData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/quotes/admin/${quoteId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updateData),
        },
      );

      if (!res.ok) {
        throw new Error("Errore nell'aggiornamento del preventivo");
      }

      const data = await res.json();
      message.success("Preventivo aggiornato e email inviata!");

      await fetchAllQuotes();

      return data;
    } catch (error) {
      console.error("Errore:", error);
      message.error("Impossibile aggiornare il preventivo");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    quotes,
    filters,
    pagination,
    fetchAllQuotes,
    updateQuoteWithEmail,
  };
};

export default useAdminOrders;
