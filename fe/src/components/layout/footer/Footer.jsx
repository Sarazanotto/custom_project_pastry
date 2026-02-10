import { Col, Row, Space } from "antd";
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
      <Row justify="space-evenly" gutter={0}>
        <Col>
          <img className="logo-footer" src="../../../../assets/logo.png" />
          <p>La tua pasticceria di fiducia</p>
        </Col>
        <Col>
          <h5>Link utili</h5>
          <Space orientation="vertical" size="small">
            <a href="/home">Home</a>
            <a href="/cakes">Our cakes</a>

            <a href="/about">About Us</a>
            <a href="/contact">Contacts</a>
          </Space>
        </Col>
        <Col orientation="vertical">
          <Space orientation="vertical" size="small">
            <span>
              {" "}
              <EnvironmentOutlined /> Via Giacomo Rossi 81,Milano{" "}
            </span>
            <span>
              {" "}
              <PhoneOutlined /> +39 4456789441{" "}
            </span>
            <span>
              {" "}
              <MailOutlined /> pastrylab@lab.com{" "}
            </span>
          </Space>

          <Col className="social-footer">
            <Space size="small">
              <span>
                <InstagramOutlined />{" "}
              </span>
              <span>
                {" "}
                <FacebookOutlined />{" "}
              </span>
              <span>
                {" "}
                <WhatsAppOutlined />{" "}
              </span>
            </Space>
          </Col>
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
