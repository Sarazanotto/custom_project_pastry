import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import UserMenu from "./UserMenu";
import { Row, Col } from "antd";
import "./header.css";

const Header = () => {
  return (
    <>
      <Row align="bottom" gutter={0}>
        <Col xs={0} sm={0} md={8}></Col>
        <Col xs={16} md={8} className="logo-col logo-col-mobile">
          <Logo />
        </Col>
        <Col xs={8} md={8} className="user-col user-col-mobile">
          <UserMenu />
        </Col>
      </Row>
      <Row gutter={0}>
        <Col span={24}>
          <NavBar />
        </Col>
      </Row>
    </>
  );
};

export default Header;
