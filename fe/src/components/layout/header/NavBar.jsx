
import { Menu } from "antd";
import './header.css'
import {Link} from 'react-router-dom'
const NavBar = () => {
  
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
    },
    {
      label: <Link to="/cakes">Our Cakes</Link>,
      key: "cakes",
    },
    {
      label: <Link to="/about">About us</Link>,
      key: "aboutUs",
    },
    {
      label: <Link to='/contact'>Contact</Link>,
      key: "contact",
    },
  ];
  return <Menu items={items} mode="horizontal" className="links-width"></Menu>;
};

export default NavBar;
