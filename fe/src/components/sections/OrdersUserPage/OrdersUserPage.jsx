import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Empty, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useQuote from "../../../hook/useQuote";
import QuoteCard from "../../sections/quotePage/QuoteCard";
import "./ordersUserPage.css";
const OrdersUserPage = () => {
  const navigate = useNavigate();
  const {
    quotes,
    loading,
    fetchUserQuotes,
    confirmQuote,
    rejectQuote,
    deleteQuote,
  } = useQuote();

  useEffect(() => {
    fetchUserQuotes();
  }, [fetchUserQuotes]);

  const handleConfirm = async (quoteId) => {
    Modal.confirm({
      title: "Conferma Preventivo",
      content: "Sei sicuro di voler confermare questo preventivo? ",
      okText: "Sì, Conferma",
      cancelText: "Annulla",
      okType: "primary",
      onOk: async () => {
        try {
          await confirmQuote(quoteId);
        } catch (error) {
          console.error("Errore conferma:", error);
        }
      },
    });
  };

  const handleReject = async (quoteId) => {
    Modal.confirm({
      title: "Rifiuta Preventivo",
      content: "Sei sicuro di voler rifiutare questo preventivo?",
      okText: "Sì, Rifiuta",
      cancelText: "Annulla",
      okType: "danger",
      onOk: async () => {
        try {
          await rejectQuote(quoteId);
        } catch (error) {
          console.error("Errore rifiuto:", error);
        }
      },
    });
  };

  const handleDelete = async (quoteId) => {
    Modal.confirm({
      title: "Elimina Richiesta",
      content: "Sei sicuro di voler eliminare questa richiesta?",
      okText: "Sì, Elimina",
      okType: "danger",
      cancelText: "Annulla",
      onOk: async () => {
        try {
          await deleteQuote(quoteId);
        } catch (error) {
          console.error("Errore eliminazione:", error);
        }
      },
    });
  };

  const handleNavigate = () => {
    navigate("/quote/new");
  };
  return (
    <div className="container-orders-user">
      <Row justify={{ sm: "center", md: "space-between" }} align="middle">
        <h1>I Miei Preventivi</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleNavigate}>
          Nuova Richiesta
        </Button>
      </Row>

      {quotes.length === 0 ? (
        <Empty description="Non hai ancora richieste di preventivo">
          <Button type="primary" onClick={handleNavigate}>
            Crea la tua prima richiesta
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]} justify={{ sm: "center", md: "start" }}>
          {quotes.map((quote) => (
            <QuoteCard
              key={quote._id}
              quote={quote}
              onConfirm={handleConfirm}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          ))}
        </Row>
      )}
    </div>
  );
};

export default OrdersUserPage;
