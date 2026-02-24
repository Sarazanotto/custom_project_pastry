import { useState } from "react";
import { Card, Tag, Button, Descriptions, Space, Col } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import QuoteModal from "./AdminQuoteModal";
import "./admin.css";

const AdminOrderCard = ({ quote, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleToggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

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
    quoted: "Preventivo Inviato",
    confirmed: "Confermato",
    rejected: "Rifiutato",
    in_progress: "In Preparazione",
    completed: "Completato",
    cancelled: "Annullato",
  };

  const inShop = !quote.address;

  const handleComplete = () => {
    onUpdate(quote._id, { status: "completed", sendReadyEmail: true });
  };

  const handleOpenaModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSendQuote = (values) => {
    onUpdate(quote._id, values);
    setModalVisible(false);
  };

  return (
    <Col>
      <Card
        title={
          <div className="card-title-admin">
            <p>{quote.event.charAt(0).toUpperCase() + quote.event.slice(1)}</p>
            <Tag color={statusColors[quote.status]}>
              {statusLabels[quote.status]}
            </Tag>
          </div>
        }
        extra={
          <Button type="link" onClick={handleToggleDetails}>
            {detailsVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </Button>
        }
      >
        <div className="card-body-admin">
          <p>
            <strong>Cliente:</strong> {quote.user?.firstName}
            {quote.user?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {quote.user?.email}
          </p>
          <p>
            <strong>Telefono:</strong> {quote.user?.phone}
          </p>
          <p>
            <strong>Persone:</strong> {quote.serving}
          </p>
          <p>
            <strong>Data Consegna:</strong>
            {dayjs(quote.deliveryData).format("DD/MM/YYYY")}
          </p>

          <div>
            <strong>Consegna:</strong>
            {inShop ? <p> Ritiro in negozio</p> : <p>Domicilio</p>}
          </div>

          {!inShop && (
            <>
              <p>
                <strong>Città:</strong> {quote.address?.city}
              </p>
              <p>
                <strong>Indirizzo:</strong> {quote.address?.street}
              </p>
              <p>
                <strong>CAP:</strong> {quote.address?.zipCode}
              </p>
            </>
          )}

          <p>
            Richiesta il: {dayjs(quote.createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>

        {detailsVisible && (
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="Forma">{quote.form}</Descriptions.Item>
            <Descriptions.Item label="Base">{quote.cakeBase}</Descriptions.Item>
            <Descriptions.Item label="Bagna">
              {quote.cakeSoak}
            </Descriptions.Item>
            <Descriptions.Item label="Crema">
              {quote.cakeCream}
            </Descriptions.Item>
            <Descriptions.Item label="Topping">
              {quote.cakeTopping}
            </Descriptions.Item>

            {quote.cakeLettering && (
              <Descriptions.Item label="Scritta">
                {quote.cakeLettering}
              </Descriptions.Item>
            )}
            {quote.cakeDecoration && (
              <Descriptions.Item label="Decorazioni">
                {quote.cakeDecoration}
              </Descriptions.Item>
            )}
            {quote.allergies && (
              <Descriptions.Item label="Allergie">
                {quote.allergies}
              </Descriptions.Item>
            )}
            {quote.otherNotes && (
              <Descriptions.Item label="Note">
                {quote.otherNotes}
              </Descriptions.Item>
            )}
            {quote.exapleCake && (
              <Descriptions.Item label="Esempio">
                <a href={quote.exapleCake}>Vedi immagine</a>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}

        {quote.priceQuoted && (
          <p>
            <strong>Prezzo: €{quote.priceQuoted}</strong>
          </p>
        )}

        {quote.adminNotes && (
          <p>
            <strong>Note Admin:</strong> {quote.adminNotes}
          </p>
        )}

        <Space orientation="vertical">
          {quote.status === "pending" && (
            <Button type="primary" onClick={handleOpenaModal}>
              Invia Preventivo
            </Button>
          )}
          {quote.status === "quoted" && (
            <Button type="primary" onClick={handleOpenModal} block>
              Modifica Preventivo
            </Button>
          )}
          {quote.status === "confirmed" && (
            <div className="container-status-quote status-pending">
              <p>Ordine Confermato — In attesa di pagamento</p>
            </div>
          )}
          {quote.status === "in_progress" && (
            <>
              <div className="container-status-quote status-confirmed">
                <p>Confermato e pagato</p>
              </div>
              <Button type="primary" onClick={handleComplete} block>
                Segna come Completato
              </Button>
            </>
          )}
          {quote.status === "rejected" && (
            <div className="container-status-quote status-rejected">
              <p>Ordine Rifiutato dal Cliente</p>
            </div>
          )}
        </Space>
      </Card>

      <QuoteModal
        visible={modalVisible}
        onCancel={handleCloseModal}
        onSubmit={handleSendQuote}
        quote={quote}
      />
    </Col>
  );
};

export default AdminOrderCard;
