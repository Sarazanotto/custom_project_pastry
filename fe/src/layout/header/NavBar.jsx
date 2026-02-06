import React from "react";
import { Menu } from "antd";

const NavBar = () => {
  const items = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Our Cakes",
      key: "cakes",
    },
    {
      label: "About us",
      key: "aboutUs",
    },
  ];
  return <Menu items={items} mode="horizontal"></Menu>;
};

export default NavBar;
