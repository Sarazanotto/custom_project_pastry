import { Row } from "antd"
import heroAbout from "../../../../../assets/hero.jpg"
import "./heroAbout.css"
const Hero = () => {
  return (
 <Row className="section-hero-about">
 <div className="container-hero-about">
        <img src={heroAbout} alt="" />
      </div>
      <div className="container-text-hero-about">
        <h1>
            About Us
        </h1>
       </div>
    </Row>
  )
}

export default Hero
