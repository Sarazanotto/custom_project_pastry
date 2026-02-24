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
      <Row justify="center" gutter={[0, 24]}>
        <Col xs={24} md={12} className="logo-description">
          <img className="logo-footer" src="../../../../assets/logo.png" />
          <p>La tua pasticceria di fiducia</p>
        </Col>

        <Col xs={24} md={12} orientation="vertical">
          <Space orientation="vertical" size="small">
            <span>
              <EnvironmentOutlined /> Via Roma, 10 - 35100 Padova (PD)
            </span>
            <span>
              <PhoneOutlined /> +39 4456789441
            </span>
            <a className="link-email" href="mailto:pastrylab@lab.com">
              <MailOutlined /> pastrylab@lab.com
            </a>
          </Space>

          <div className="social-footer">
            <Space size="small">
              <a href="https://www.facebook.com">
                <FacebookOutlined />
              </a>
              <a href="https://www.instagram.com">
                <InstagramOutlined />
              </a>

              <a href="https://wa.me/3479759122">
                <WhatsAppOutlined />
              </a>
            </Space>
          </div>
        </Col>
      </Row>

      <Row justify="space-between" gutter={0}>
        <Col>
          <small>
            © {new Date().getFullYear()} PastryLab tutti i diritti riservati.
          </small>
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
