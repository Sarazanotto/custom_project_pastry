import { Empty, Row } from "antd";
import AdminOrderCard from "./AdminOrderCard";

const OrdersList = ({ quotes, loading, onUpdate }) => {
  if (!loading && quotes.length === 0) {
    return (
      <div className="container-empty">
        <Empty
          description="Nessun ordine trovato"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className="page-order-admin">
      <Row gutter={[30,30]} justify="center">
        {quotes.map((quote) => (
          <AdminOrderCard key={quote._id} quote={quote} onUpdate={onUpdate} />
        ))}
      </Row>
    </div>
  );
};

export default OrdersList;
