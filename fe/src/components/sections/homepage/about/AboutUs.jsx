import { Col, Row } from "antd";

import "./aboutUs.css";
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <Row justify="start" align="middle" className="section-about">
      <Col xs={24} md={12}>
        <div className="container-imgs">
          <img src="../../../../../assets/hompage.jpg" alt="" />
          <img src="../../../../../assets/hompage2.jpg" alt="" />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="container-about">
          <h2>Una passione nata dall'amore</h2>
          <Link to="/about">Scopri di più</Link>
          <p>
            Siamo una pasticceria artigianale specializzata esclusivamente nella
            creazione di torte personalizzate per ogni tipo di evento. Che si
            tratti di un matrimonio, un compleanno, una comunione o una festa
            aziendale, ogni torta viene progettata e realizzata su misura per il
            cliente.Dal primo preventivo alla consegna, seguiamo ogni
            dettaglio per trasformare la tua idea in una torta che sorprenda e
            emozioni. Non creiamo torte standard: creiamo ricordi dolci, uno
            strato alla volta.
          </p>
          <div className="container-free-about">
            <img src="../../../../assets/GLUTENFREE.png" alt="" />
            <img src="../../../../assets/LACTOSEFREE.png" alt="" />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AboutUs;
