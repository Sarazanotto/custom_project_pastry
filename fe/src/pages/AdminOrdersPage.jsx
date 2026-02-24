import { useEffect, useContext } from 'react';
import { Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import useAdminOrders from '../hook/useAdminOrders';
import OrdersList from '../components/sections/adminOrderspage/OrderList';

const AdminOrdersPage = () => {
  const { user } = useContext(AuthContext); // ✅ useContext diretto
  const navigate = useNavigate();
  const { quotes, loading, fetchAllQuotes, updateQuoteWithEmail } = useAdminOrders();

  useEffect(() => {
    // ✅ Verifica che l'utente sia admin
    if (!user || user.user?.role !== 'admin') {
      navigate('/');
      return;
    }

    // Carica tutti i preventivi
    fetchAllQuotes();
  }, [user, navigate, fetchAllQuotes]);

  // ✅ Verifica admin
  if (!user || user.user?.role !== 'admin') {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Alert
          message="Accesso Negato"
          description="Non hai i permessi per accedere a questa pagina."
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (loading && quotes.length === 0) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-header">
        <h1>Gestione Ordini</h1>
        <p>Gestisci tutti i preventivi e invia le quotazioni ai clienti</p>
      </div>



      <OrdersList 
        quotes={quotes} 
        loading={loading}
        onUpdate={updateQuoteWithEmail}
      />
    </div>
  );
};

export default AdminOrdersPage;