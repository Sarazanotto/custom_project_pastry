import heroCakesPage from "../../../../../assets/heroCakesPage.jpg";
import { useNavigate } from "react-router-dom";
import "./heroCakePage.css";
import { Row, Button } from "antd";

const HeroCakePage = () => {
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
    <Row className="section-hero-cake">
      <div className="container-hero-cake">
        <img src={heroCakesPage} alt="immagini di fette di torta " />
      </div>
      <div className="container-text-hero-cake">
        <h1>Fatti ispirare</h1>
        <p>
          Ogni creazione è unica e personalizzata in base alle richieste dei
          nostri clienti. Sfoglia le nostre realizzazioni per trovare
          ispirazione e immaginare la torta perfetta per il tuo evento.
        </p>

        <Button type="primary" onClick={handleQuoteRequest}>
          Richiedi un preventivo
        </Button>
      </div>
    </Row>
  );
};

export default HeroCakePage;
