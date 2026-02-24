import { Card, Col } from "antd";

import "../cakes.css";

const CardCake = ({ img, title, description }) => {
  return (
    <Col>
      <Card
        className="card-cake"
        cover={<img draggable={false} src={img} alt={title} />}
      >
        <p>{title}</p>
        <p>{description}</p>
      </Card>
    </Col>
  );
};

export default CardCake;
