import { Row, Col } from "antd";
import "./sectionStory.css";
const SectionStory = () => {
  return (
    <div className="container-section-story">
      <Row align="middle" justify="center" gutter={[32, 32]}>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }}>
          <div className="container-imgs">
            <img src="../../../../../assets/about_2.jpg" alt="" />

            <img src="../../../../../assets/about_3.jpg" alt="" />
          </div>
        </Col>

        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 12, order: 1 }}
          className="container-text"
        >
          <h2>Una passione nata dall"amore</h2>
          <p>
            Realizziamo esclusivamente torte su ordinazione, completamente
            personalizzate. Ogni creazione nasce dalle tue idee e prende forma
            per rendere unico il tuo evento. Matrimoni, compleanni, battesimi o
            occasioni speciali: raccontaci il tuo sogno e trasformeremo la tua
            occasione in un momento indimenticabile.
          </p>
          <h2>La tua storia, la tua torta</h2>
          <p>
            Dal compleanno alla festa più intima, ogni dolce racconta la tua
            storia. Realizziamo creazioni classiche e moderne, anche senza
            glutine e senza latte. Con passione e cura, trasformiamo ogni
            occasione in un momento indimenticabile.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default SectionStory;
