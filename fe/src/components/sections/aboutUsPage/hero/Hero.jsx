import { Row } from 'antd'
import React from 'react'
import './heroAbout.css'
const Hero = () => {
  return (
 <Row className="section-hero-about">
 <div className="container-hero-about">
        <img src="../../../../../assets/hero.jpg" alt="" />
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
