import { Col } from "antd";
import React from "react";
import "./sectionStory.css";
const SectionStory = () => {
  return (
    <div className="container-section-story">
      <Col span={8}>
        <img src="../../../../../assets/sectionStory.jpg" alt="" />
      </Col>

      <Col span={7} className="container-text">
        <h2>Una passione nata dall'amore</h2>
        <p>
          L’amore per le torte nasce dalla cura di ogni dettaglio. Ogni impasto
          è un gesto di passione e creatività. Decoriamo con il cuore,
          trasformando idee in emozioni. Per noi, una torta è molto più di un
          dolce: è un atto d’amore.
        </p>
        <h2>La tua storia, la tua torta</h2>
        <p>
          Dal compleanno alla festa più intima, ogni dolce racconta la tua
          storia. Realizziamo creazioni classiche e moderne, anche senza glutine
          e senza latte. Con passione e cura, trasformiamo ogni occasione in un
          momento indimenticabile.
        </p>
      </Col>
    </div>
  );
};

export default SectionStory;
