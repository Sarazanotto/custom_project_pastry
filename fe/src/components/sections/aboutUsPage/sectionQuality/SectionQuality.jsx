import React from "react";
import { Col } from "antd";
import "./sectionQuality.css";
const SectionQuality = () => {
  return (
    <div className="container-section-quality">
      <Col span={8} className="container-text">
        <h2>La qualità che ci distingua</h2>
        <p>
          La qualità è il nostro ingrediente principale. Utilizziamo materie
          prime selezionate a km0, fresche e genuine, per garantire sapori
          autentici e naturali. Offriamo anche opzioni senza latte, senza
          glutine e completamente vegane, senza mai rinunciare al gusto. Ogni
          dolce nasce dall’attenzione verso chi lo assapora e dal rispetto per
          l’ambiente.
        </p>
        <h2>Il cioccolato</h2>
        <p>
          Il cioccolato, che non può essere a km0, è scelto con cura dalle
          migliori piantagioni del mondo. Selezioniamo solo qualità eccellenti,
          per garantire gusto intenso e autentico. Ogni tavoletta diventa
          protagonista dei nostri dolci, fondente o al latte.
        </p>
      </Col>
      <Col span={7}>
        <img src="../../../../../assets/sectionQuality.jpg" alt="" />
      </Col>
    </div>
  );
};

export default SectionQuality;
