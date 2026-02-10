import React from 'react'
import './heroCakePage.css'
import { Row, Button } from 'antd'
const HeroCakePage = () => {
  return (
     <Row className="section-hero-cake">
 <div className="container-hero-cake">
        <img src="../../../../../assets/heroCakesPage.jpg" alt="" />
      </div>
      <div className="container-text-hero-cake">
        <h2>
            Le nostre proposte
        </h2>
        <p>Puoi scegliere direttamente dal nostro shop oppure personalizzare la tua torta chiedendo un preventivo</p>
      
      
        <Button type="primary">Richiedi un preventivo</Button>
      </div>
    </Row>
  )
}

export default HeroCakePage
