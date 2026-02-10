import { Card, Col } from "antd";
import React from "react";

import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
const CardCakes = ({img, title, description, price}) => {
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

export default CardCakes;
