import { Card, Col } from "antd";
import ModalDetailCake from "./ModalDetailCake";
import { useState } from "react";

const CardCakes = ({ id, img, title, description, price }) => {
  const [openModal, setOpenModal] = useState(false);
  
  const showModal = () => {
    setOpenModal(true);
  };
  
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Col>
      <Card
        className="card-cake"
        cover={<img draggable={false} src={img} alt={title} />}
        actions={[
          <small onClick={showModal} key="details">Dettagli</small>
        ]}
      >
        <p>{title}</p>
        <p>{description}</p>
        <p>{price}€</p>
      </Card>

      <ModalDetailCake cakeId={id} open={openModal} onClose={closeModal} />
    </Col>
  );
};

export default CardCakes;