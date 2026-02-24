import { Card, Tag, Button, Col } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./quote.css";

const QuoteCard = ({ quote, onConfirm, onReject, onDelete }) => {
  const navigate = useNavigate();

const handleConfirm = () => onConfirm(quote._id);
const handleReject = () => onReject(quote._id);
const handleDelete = () => onDelete(quote._id);

  const statusColors = {
    pending: "orange",
    quoted: "blue",
    confirmed: "green",
    rejected: "red",
 
    completed: "cyan",
    cancelled: "default",
  };

  const statusLabels = {
    pending: "In Attesa",
    quoted: "Preventivo Ricevuto",
    confirmed: "Confermato",
    rejected: "Rifiutato",
   
    completed: "Completato",
    cancelled: "Annullato",
  };

  const isPickup = !quote.address;

  const handlePay = () => {
    navigate("/checkout", {
      state: {
        amount: Math.round(quote.priceQuoted * 100),
        description: `Preventivo - ${quote.event}`,
        quoteId: quote._id,
      },
    });
  };

  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        className="card-order-user"
        title={quote.event.charAt(0).toUpperCase() + quote.event.slice(1)}
        extra={
          <Tag color={statusColors[quote.status]}>
            {statusLabels[quote.status]}
          </Tag>
        }
      >
        <p>
          <strong>Persone:</strong> {quote.serving}
        </p>
        <p>
          <strong>Data:</strong>
          {dayjs(quote.deliveryData).format("DD/MM/YYYY")}
        </p>
        <div>
          <strong>Consegna:</strong>
          {isPickup ? (
            <p>Ritiro in negozio — Via Roma, 10 - 35100 Padova (PD)</p>
          ) : (
            <p>
              {quote.address?.city}, {quote.address?.street}
            </p>
          )}
        </div>
        {quote.priceQuoted && <p>Prezzo: €{quote.priceQuoted}</p>}
        {quote.adminNotes && (
          <div className="container-admin-notes">
            <strong>Note:</strong> {quote.adminNotes}
          </div>
        )}
        <p>Richiesta il: {dayjs(quote.createdAt).format("DD/MM/YYYY")}</p>

        <div className="btns-quote-card">
          {quote.status === "quoted" && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleConfirm}
                block
              >
                Conferma Ordine
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleReject}
                block
              >
                Rifiuta
              </Button>
            </>
          )}
          {quote.status === "pending" && (
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              block
            >
              Elimina
            </Button>
          )}
          {quote.status === "confirmed" && (
            <>
              {quote.isPaid ? (
                <div className="container-status-quote status-confirmed">
                  <p>Pagamento Completato</p>
                </div>
              ) : (
                <>
                  <div className="container-status-quote status-confirmed">
                    <p>Ordine Confermato</p>
                  </div>
                  <Button
                    type="primary"
                    icon={<CreditCardOutlined />}
                    onClick={handlePay}
                    block
                  >
                    Procedi al Pagamento → €{quote.priceQuoted}
                  </Button>
                </>
              )}
            </>
          )}
          {quote.status === "rejected" && (
            <div className="container-status-quote status-rejected">
              <p>Ordine Rifiutato</p>
            </div>
          )}
        </div>
      </Card>
    </Col>
  );
};

export default QuoteCard;
