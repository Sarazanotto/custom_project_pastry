import { List, Empty } from 'antd';
import AdminOrderCard from './AdminOrderCard';

const OrdersList = ({ quotes, loading, onUpdate }) => {
  if (!loading && quotes.length === 0) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Empty
          description="Nessun ordine trovato"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={quotes}
        loading={loading}
        renderItem={(quote) => (
          <List.Item>
            <AdminOrderCard quote={quote} onUpdate={onUpdate} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrdersList;