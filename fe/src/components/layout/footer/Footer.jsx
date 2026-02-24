import { Col, Row, Space } from "antd";
import logo from "../../../../assets/logo.png"
import "./footer.css";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="container-footer">
      <Row  className="sectio-footer" justify="center"
  align="middle">
        <Col xs={24} md={8} className="logo-description">
          <img className="logo-footer" src={logo} />
          <p>La tua pasticceria di fiducia</p>
        </Col>

        <Col
          xs={24}
          md={8}
          className="container-contact"
        >
          <div   className="container-contact"> 
            <span>
              {" "}
              <EnvironmentOutlined /> Via Giacomo Rossi 81,Milano{" "}
            </span>
            <span>
              {" "}
              <PhoneOutlined /> +39 4456789441{" "}
            </span>
            <a className="link-email" href="mailto:pastrylab@lab.com">
              <MailOutlined /> pastrylab@lab.com
            </a>
          </div>
        </Col>
        <Col xs={24} md={8} >
          <div className="social-footer">
           <div>
              <a href="https://www.facebook.com">
                <FacebookOutlined />{" "}
              </a>
              <a href="https://www.instagram.com">
                <InstagramOutlined />
              </a>

              <a href="https://wa.me/3479759122">
                {" "}
                <WhatsAppOutlined />{" "}
              </a>
         </div>
          </div>
        </Col>
      </Row>

      <Row justify="space-between" gutter={0}>
        <Col>
          © {new Date().getFullYear()} PastryLab tutti i diritti riservati.
        </Col>
        <Col>
          <Space size="small">
            <small> Privacy</small>

            <small>Termini e condizioni</small>
            <small>Cookie policy</small>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
