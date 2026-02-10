import { Col, Row } from "antd";
import React from "react";
import "./aboutUs.css";
import {Link} from 'react-router-dom'
const AboutUs = () => {
  return (
    <Row justify="center" align='middle' className="section-about">
      <Col span={8}>
        <div className="container-imgs">
          <img  src="../../../../../assets/hompage.jpg" alt="" />
          <img src="../../../../../assets/hompage2.jpg" alt="" />
        </div>
      </Col>

      <Col span={8}>
        <div className="container-about">
          <h2>Una passione nata dall'amore</h2>
          <Link to="/about">Scopri di più</Link>
          <p>
            Nel nostro laboratorio artigianale di Pozzoleone, l'arte della
            pasticceria si tramanda di generazione in generazione: giovani
            apprendisti lavorano a fianco dei maestri, imparando il rigore, le
            tecniche e i segreti della buona pasticceria.
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
