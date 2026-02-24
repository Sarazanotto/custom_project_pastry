import heroContact from "../../../../../assets/heroContact.jpg"
import { Row } from "antd"
import "./heroContact.css"
const HeroContact = () => {
  return (
 <Row className="section-hero-contact">
 <div className="container-hero-contact">
        <img src={heroContact} alt="Foto del locale" />
      </div>
      <div className="container-text-hero-contact">
        <h1>
            Vieni a trovarci!
        </h1>
       </div>
    </Row>
  )
}

export default HeroContact
