
import "./hero.css";
import { useNavigate } from "react-router-dom";

import { Button, Row } from "antd";
const Hero = () => {
  const navigate = useNavigate();

  const handleQuoteRequest = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/quote/new");
    }
  };
  return (
    <Row className="section-hero">
 <div className="container-hero">
        <img src="../../../../../assets/heroHome.jpg" alt="" />
      </div>
      <div className="container-text-hero">
        <h1>
            Creazione di torte personalizzate
        </h1>
        <p>Ogni creazione nasce dalle tue idee e prende forma per rendere unico il tuo evento.</p>
      
      
        <Button type="primary" onClick={handleQuoteRequest}>Richiedi un preventivo</Button>
      </div>
    </Row>
     
   
  );
};

export default Hero;
