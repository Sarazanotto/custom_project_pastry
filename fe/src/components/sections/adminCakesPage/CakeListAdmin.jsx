import { Row, Col, Empty } from "antd";

import LoadingSpinner from "../../costum/LoadingSpinner";
import CakeCardAdmin from "./CakeCardAdmin";

const CakeList = ({ cakes, loading, onEdit, onDelete }) => {
  return (
    <LoadingSpinner loading={loading}>
      {!loading && cakes.length === 0 ? (
        <Empty />
      ) : (
        <Row gutter={[25, 25]} align="stretch">
          {cakes.map((cake) => (
            <CakeCardAdmin
              key={cake._id}
              cake={cake}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Row>
      )}
    </LoadingSpinner>
  );
};

export default CakeList;
