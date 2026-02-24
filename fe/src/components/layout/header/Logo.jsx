import logo from "../../../../assets/logo.png"
import "./header.css";
import { Row, Col } from "antd";

const Logo = () => {
  return (
    <Row justify="center" align="middle">
      <Col>
        <img
          className="logo"
          src={logo}
          alt="Logo dell apasticceria PastryLab"
        />
      </Col>
    </Row>
  );
};

export default Logo;
