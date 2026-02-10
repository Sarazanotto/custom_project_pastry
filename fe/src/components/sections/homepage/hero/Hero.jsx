
import "./hero.css";
import { Button, Row } from "antd";
const Hero = () => {
  return (
    <Row className="section-hero">
 <div className="container-hero">
        <img src="../../../../../assets/heroHomepage.jpg" alt="" />
      </div>
      <div className="container-text-hero">
        <h2>
            Concediti una fetta di perfezione
        </h2>
        <p>Creiamo e personalizziamo torte per ogni evento</p>
      
      
        <Button type="primary">Richiedi un preventivo</Button>
      </div>
    </Row>
     
   
  );
};

export default Hero;
