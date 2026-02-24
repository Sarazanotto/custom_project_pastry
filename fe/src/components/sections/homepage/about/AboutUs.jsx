import { Col, Row } from "antd";
import imageOne from "../../../../../assets/hompage.jpg"
import imageTwo from "../../../../../assets/hompage2.jpg"
import logoGlutenFree from "../../../../../assets/GLUTENFREE.png" 
import logoLactoseFree from "../../../../../assets/LACTOSEFREE.png"

import "./aboutUs.css";
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <Row justify="start" align="middle" className="section-about">
      <Col xs={24} md={12}>
        <div className="container-imgs">
          <img src={imageOne} alt="Torta a tre piani rosa oro con fiori" />
          <img src={imageTwo} alt=" foto di pasticcera che termina la decorazione di una torta" />
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
            <img src={logoGlutenFree}alt="bollino gluten free" />
            <img src={logoLactoseFree} alt="bollino senza lattosio" />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AboutUs;
