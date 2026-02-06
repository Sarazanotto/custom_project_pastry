import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import UserMenu from "./UserMenu";
import { Row, Col, Flex } from "antd";

const Header = () => {
  return (
    <div>
      <Logo />
      <Flex justify="space-between" align="center" >
    
        <NavBar />
            <UserMenu />
      </Flex>
    </div>
  );
};

export default Header;
