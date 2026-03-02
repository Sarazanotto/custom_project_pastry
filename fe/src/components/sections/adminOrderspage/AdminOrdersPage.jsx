import { useEffect, useContext } from "react";
import { Alert, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useAdminOrders from "../../../hook/useAdminOrders";
import OrdersList from "./AdminOrdersList";
import LoadingSpinner from "../../costum/LoadingSpinner";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { quotes, loading, fetchAllQuotes, updateQuoteWithEmail } = useAdminOrders();

  const isAdmin = user?.user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchAllQuotes();
  }, [isAdmin, navigate, fetchAllQuotes]);

  if (!isAdmin) {
    return (
      <div>
        <Alert
          title="Accesso Negato"
          description="Non hai i permessi per accedere a questa pagina."
          type="error"
          showIcon
        />
      </div>
    );
  }

  const nuoveRichieste = quotes.filter((q) => ["pending", "quoted", "confirmed"].includes(q.status));
  const inPreparazione = quotes.filter((q) => q.status === "in_progress");
  const conclusi = quotes.filter((q) => ["completed", "rejected", "cancelled"].includes(q.status));

  const tabs = [
    {
      key: "nuove",
      label: `Nuove Richieste (${nuoveRichieste.length})`,
      children: <OrdersList quotes={nuoveRichieste} loading={loading} onUpdate={updateQuoteWithEmail} />,
    },
    {
      key: "preparazione",
      label: `In Preparazione (${inPreparazione.length})`,
      children: <OrdersList quotes={inPreparazione} loading={loading} onUpdate={updateQuoteWithEmail} />,
    },
    {
      key: "conclusi",
      label: `Conclusi (${conclusi.length})`,
      children: <OrdersList quotes={conclusi} loading={loading} onUpdate={updateQuoteWithEmail} />,
    },
  ];

  return (
    <LoadingSpinner loading={loading && quotes.length === 0}>
      <div className="admin-orders-page">
        <div className="admin-header">
          <h1>Gestione Ordini</h1>
      
        </div>
        <Tabs items={tabs} />
      </div>
    </LoadingSpinner>
  );
};

export default AdminOrders;