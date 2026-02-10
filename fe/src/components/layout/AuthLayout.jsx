import React from "react";
import Logo from "./header/Logo";
import "./header/header.css";
const AuthLayout = ({ children }) => {
  return (
    <>
      <div>
        <Logo />
      </div>
      <div>{children}</div>
    </>
  );
};

export default AuthLayout;
