import { Card, Col } from "antd";
import React from "react";
import '../cakes.css'
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
const CardCake = ({img, title, description, price}) => {
  return (
    <Col>
      <Card className="card-cake"
        cover={
          <img 
            draggable={false}
            src={img}
            alt={title}
          />
        }
        actions={[
            <HeartOutlined key='heart' />,
            <ShoppingCartOutlined key='cart' />
        ]}
      >
        <p>{title}</p>
        <p>{description}</p>
        <p>{price}</p>
      </Card>
    </Col>
  );
};

export default CardCake;
