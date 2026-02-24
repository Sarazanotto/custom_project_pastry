import imageOne from "../../../../../assets/about_1.jpg"
import imageTwo from "../../../../../assets/about_4.jpg"

import { Row, Col } from "antd";
import "./sectionQuality.css";
const SectionQuality = () => {
  return (
    <div className="container-section-quality">
      <Row align="middle" justify="center" gutter={[32, 32]}>
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 12, order: 2 }}
          className="container-text"
        >
          <h2>La qualità che ci distingue</h2>
          <p>
            La qualità è il nostro ingrediente principale. Offriamo opzioni
            senza latte, senza glutine e completamente vegane, senza mai
            rinunciare al gusto. Ogni dolce nasce dall’attenzione verso chi lo
            assapora e dal rispetto per l’ambiente.
          </p>
          <h2>Il cioccolato</h2>
          <p>
            Il cioccolato è scelto con cura dalle migliori piantagioni del
            mondo. Selezioniamo solo qualità eccellenti, per garantire gusto
            intenso e autentico.
          </p>
        </Col>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
          <div className="container-imgs">
            <img src={imageOne} alt="immagine di una naked cake con fragole e fiori freschi" />

            <img src={imageTwo} alt="immagine di mani di pasticcere che toccano farina" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SectionQuality;
