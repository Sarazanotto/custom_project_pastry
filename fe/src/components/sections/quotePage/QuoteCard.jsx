import { Card, Tag, Button } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./quote.css";

const QuoteCard = ({ quote, onConfirm, onReject, onDelete }) => {
  const statusColors = {
    pending: "orange",
    quoted: "blue",
    confirmed: "green",
    rejected: "red",
    in_progress: "purple",
    completed: "cyan",
    cancelled: "default",
  };

  const statusLabels = {
    pending: "In Attesa",
    quoted: "Preventivo Ricevuto",
    confirmed: "Confermato",
    rejected: "Rifiutato",
    in_progress: "In Preparazione",
    completed: "Completato",
    cancelled: "Annullato",
  };

  return (
    <Card
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
        <strong>Data:</strong> {dayjs(quote.deliveryData).format("DD/MM/YYYY")}
      </p>
      <p>
        <strong>Città:</strong> {quote.address?.city}
      </p>

      {quote.priceQuoted && <p>Prezzo: €{quote.priceQuoted}</p>}

      {quote.adminNotes && (
        <div className="container-admin-notes">
          <strong>Note:</strong> {quote.adminNotes}
        </div>
      )}

      <p>Richiesta il: {dayjs(quote.createdAt).format("DD/MM/YYYY")}</p>

      <div>
        {quote.status === "quoted" && (
          <>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => onConfirm(quote._id)}
              block
            >
              Conferma Ordine
            </Button>

            <Button
              icon={<CloseOutlined />}
              onClick={() => onReject(quote._id)}
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
            onClick={() => onDelete(quote._id)}
            block
          >
            Elimina
          </Button>
        )}

        {quote.status === "confirmed" && (
          <div className="container-status-quote status-confirmed">
            {" "}
            <p>Ordine Confermato</p>{" "}
          </div>
        )}

        {quote.status === "rejected" && (
          <div className="container-status-quote status-rejected">
            {" "}
            <p> Ordine Rifiutato</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuoteCard;
