import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuote from '../hook/useQuote';
import { Button, Row, Col, Empty, Spin, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import QuoteCard from '../components/sections/quotePage/QuoteCard';

const OrderUser = () => {
  const navigate = useNavigate();
  const { quotes, loading, fetchUserQuotes, confirmQuote, rejectQuote, deleteQuote } = useQuote();

  useEffect(() => {
    fetchUserQuotes();
  }, [fetchUserQuotes]);

  const handleConfirm = async (quoteId) => {
    Modal.confirm({
      title: 'Conferma Preventivo',
      content: 'Sei sicuro di voler confermare questo preventivo? L\'ordine verrà processato.',
      okText: 'Sì, Conferma',
      cancelText: 'Annulla',
      okType: 'primary',
      onOk: async () => {
        try {
          await confirmQuote(quoteId);
        } catch (error) {
          console.error('Errore conferma:', error);
        }
      }
    });
  };

  const handleReject = async (quoteId) => {
    Modal.confirm({
      title: 'Rifiuta Preventivo',
      content: 'Sei sicuro di voler rifiutare questo preventivo?',
      okText: 'Sì, Rifiuta',
      cancelText: 'Annulla',
      okType: 'danger',
      onOk: async () => {
        try {
          await rejectQuote(quoteId);
        } catch (error) {
          console.error('Errore rifiuto:', error);
        }
      }
    });
  };

  const handleDelete = async (quoteId) => {
    Modal.confirm({
      title: 'Elimina Richiesta',
      content: 'Sei sicuro di voler eliminare questa richiesta?',
      okText: 'Sì, Elimina',
      okType: 'danger',
      cancelText: 'Annulla',
      onOk: async () => {
        try {
          await deleteQuote(quoteId);
        } catch (error) {
          console.error('Errore eliminazione:', error);
        }
      }
    });
  };

  if (loading && quotes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>I Miei Preventivi</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/quote/new')}
        >
          Nuova Richiesta
        </Button>
      </div>

      {quotes.length === 0 ? (
        <Empty 
          description="Non hai ancora richieste di preventivo"
          style={{ marginTop: 50 }}
        >
          <Button type="primary" onClick={() => navigate('/quote/new')}>
            Crea la tua prima richiesta
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {quotes.map(quote => (
            <Col xs={24} sm={24} md={12} lg={8} key={quote._id}>
              <QuoteCard 
                quote={quote}
                onConfirm={handleConfirm}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default OrderUser;