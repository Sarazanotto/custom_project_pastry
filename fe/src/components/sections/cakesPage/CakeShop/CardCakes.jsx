import { Card, Col } from "antd";
import ModalDetailCake from "./ModalDetailCake";

import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import { useState } from "react";
const CardCakes = ({id,img, title, description, price}) => {
  const[openModal, setOpenModal]= useState(false)

  const showModal=()=>{
     console.log("ID torta cliccata:", id); // <-- VERIFICA QUI
    setOpenModal(true)
  }
  const closeModal=()=>{
    setOpenModal(false)
  }
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
            <span onClick={showModal}> Dettagli</span> ,
            <ShoppingCartOutlined key='cart' />
        ]}
      >
        <p>{title}</p>
        <p>{description}</p>
        <p>{price}</p>
      </Card>

      <ModalDetailCake cakeId={id} open={openModal} onClose={closeModal} />
    </Col>
  );
};

export default CardCakes;
