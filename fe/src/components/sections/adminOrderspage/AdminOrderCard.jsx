import { useState } from 'react';
import { Card, Tag, Button, Descriptions, Space } from 'antd';
import { EuroOutlined, MailOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import QuoteModal from './QuoteModal';
import './admin.css'
const AdminOrderCard = ({ quote, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const statusColors = {
    pending: 'orange',
    quoted: 'blue',
    confirmed: 'green',
    rejected: 'red',
    in_progress: 'purple',
    completed: 'cyan',
    cancelled: 'default',
  };

  const statusLabels = {
    pending: 'In Attesa',
    quoted: 'Preventivo Inviato',
    confirmed: 'Confermato',
    rejected: 'Rifiutato',
    in_progress: 'In Preparazione',
    completed: 'Completato',
    cancelled: 'Annullato',
  };

  const handleSendQuote = (values) => {
    onUpdate(quote._id, values);
    setModalVisible(false);
  };

  return (
    <>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{quote.event.charAt(0).toUpperCase() + quote.event.slice(1)}</span>
            <Tag color={statusColors[quote.status]}>
              {statusLabels[quote.status]}
            </Tag>
          </div>
        }
        extra={
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => setDetailsVisible(!detailsVisible)}
          >
            {detailsVisible ? 'Nascondi' : 'Dettagli'}
          </Button>
        }
      >
        {/* Info Cliente */}
        <div style={{ marginBottom: 16 }}>
          <p><strong>Cliente:</strong> {quote.user?.firstName} {quote.user?.lastName}</p>
          <p><strong>Email:</strong> {quote.user?.email}</p>
          <p><strong>Telefono:</strong> {quote.user?.phone}</p>
        </div>

        {/* Info Ordine Base */}
        <div style={{ marginBottom: 16 }}>
          <p><strong>Persone:</strong> {quote.serving}</p>
          <p><strong>Data Consegna:</strong> {dayjs(quote.deliveryData).format('DD/MM/YYYY')}</p>
          <p><strong>Città:</strong> {quote.address?.city}</p>
          <p style={{ fontSize: '12px', color: '#999' }}>
            Richiesta il: {dayjs(quote.createdAt).format('DD/MM/YYYY HH:mm')}
          </p>
        </div>

        {/* Dettagli Completi (collassabili) */}
        {detailsVisible && (
          <Descriptions column={1} size="small" bordered style={{ marginBottom: 16 }}>
            <Descriptions.Item label="Forma">{quote.form}</Descriptions.Item>
            <Descriptions.Item label="Base">{quote.cakeBase}</Descriptions.Item>
            <Descriptions.Item label="Bagna">{quote.cakeSoak}</Descriptions.Item>
            <Descriptions.Item label="Crema">{quote.cakeCream}</Descriptions.Item>
            <Descriptions.Item label="Topping">{quote.cakeTopping}</Descriptions.Item>
            
            {quote.cakeLettering && (
              <Descriptions.Item label="Scritta">{quote.cakeLettering}</Descriptions.Item>
            )}
            
            {quote.cakeDecoration && (
              <Descriptions.Item label="Decorazioni">{quote.cakeDecoration}</Descriptions.Item>
            )}
            
            {quote.allergies && (
              <Descriptions.Item label="Allergie">{quote.allergies}</Descriptions.Item>
            )}
            
            {quote.otherNotes && (
              <Descriptions.Item label="Note">{quote.otherNotes}</Descriptions.Item>
            )}
            
            {quote.exapleCake && (
              <Descriptions.Item label="Esempio">
                <a href={quote.exapleCake} target="_blank" rel="noopener noreferrer">
                  Vedi immagine
                </a>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}

        {/* Prezzo se già quotato */}
        {quote.priceQuoted && (
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#1890ff', 
            marginTop: 10,
            marginBottom: 10 
          }}>
            Prezzo: €{quote.priceQuoted}
          </div>
        )}

        {quote.adminNotes && (
          <div style={{ 
            background: '#f0f0f0', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: 16 
          }}>
            <strong>Note Admin:</strong> {quote.adminNotes}
          </div>
        )}

        {/* Azioni */}
        <Space style={{ width: '100%', marginTop: 16 }} direction="vertical">
          {quote.status === 'pending' && (
            <Button
              type="primary"
              icon={<EuroOutlined />}
              onClick={() => setModalVisible(true)}
              block
            >
              Invia Preventivo
            </Button>
          )}

          {quote.status === 'quoted' && (
            <Button
              icon={<MailOutlined />}
              onClick={() => setModalVisible(true)}
              block
            >
              Modifica Preventivo
            </Button>
          )}

          {quote.status === 'confirmed' && (
            <div style={{ 
              background: '#f6ffed', 
              border: '1px solid #b7eb8f',
              padding: '10px',
              borderRadius: '4px',
              textAlign: 'center',
              color: '#52c41a',
              fontWeight: 'bold'
            }}>
              ✓ Ordine Confermato dal Cliente
            </div>
          )}

          {quote.status === 'rejected' && (
            <div style={{ 
              background: '#fff1f0', 
              border: '1px solid #ffccc7',
              padding: '10px',
              borderRadius: '4px',
              textAlign: 'center',
              color: '#ff4d4f',
              fontWeight: 'bold'
            }}>
              ✗ Ordine Rifiutato dal Cliente
            </div>
          )}
        </Space>
      </Card>

      {/* Modal per inserire prezzo */}
      <QuoteModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSendQuote}
        quote={quote}
      />
    </>
  );
};

export default AdminOrderCard;