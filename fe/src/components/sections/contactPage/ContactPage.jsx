import logoFB from "../../../../assets/logoFB.png"
import logoInsta from "../../../../assets/logoInsta.png"
import { Row } from "antd";
import HeroContact from "./heroContact/Hero";
import "./contactPage.css";
const ContactPage = () => {
  return (
    <>
      <HeroContact />
      <div className="container-contactPage">
        <Row className="container-section-contact">
          <h2>Dove siamo</h2>
          <p>
            Via Roma, 10 - 35100 Padova (PD)
            <br />
            (A due passi da Piazza Centrale – parcheggio disponibile nelle vie
            adiacenti)
          </p>
        </Row>
        <Row className="container-section-contact">
          <h2>Orari</h2>
          <p>
            Lunedì – Venerdì: 7:30 – 19:30 Sabato: 7:30 – 20:00 Domenica: 8:00 –
            13:00 <br /> Chiuso il martedì pomeriggio
          </p>
        </Row>
        <Row className="container-section-contact">
          <h2>Contatti</h2>
          <p>
            Telefono: +39 02 1234567 <br /> Email: info@dolceforno.it
          </p>
        </Row>
        <Row className="container-section-contact">
          <h2>Seguici sui social</h2>
          <div>
            <a href="https://www.facebook.com">
              <img src={logoFB} alt="facebook" />
            </a>
            <a href="https://www.instagram.com">
              <img src={logoInsta} alt="instagram" />
            </a>
          </div>
        </Row>
        <Row className="container-section-contact">
          <h2></h2>
        </Row>
      </div>
    </>
  );
};

export default ContactPage;
