import { Button, Dropdown, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const UserMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const handleDrop = (e) => {
    if (e.key === "logout") {
      logout();
      navigate("/");
    }
    if (e.key === "profile") {
      navigate("/profile");
    }
    if (e.key === "orders") {
      navigate("/orders");
    }
    if (e.key === "add-cake") {
      navigate("/admin/add-cake");
    }
    if (e.key === "manage-cakes") {
      navigate("/admin/cakes");
    }
  };
  const isAdmin = user?.user?.role === "admin";

  const menuItem = [
    { key: "profile", label: "Profilo" },
    { key: "orders", label: "I miei ordini" },
  ];
  const menuItemsAdmin = [
    {
      key: "admin-section",
      label: "Amministrazione",
      type: "group",
    },
    {
      key: "add-cake",
      label: "Aggiungi Torta",
    },
    {
      key: "manage-cakes",
      label: "Gestisci Torte",
    },
    {
      key: "manage-order",
      label: "Gestisci Ordini",
    },
  ];
  const logoutItem = [
    { type: "divider" },
    { key: "logout", label: "Esci", icon: <LogoutOutlined /> },
  ];

  const menuItems = isAdmin
    ? [...menuItemsAdmin, ...logoutItem]
    : [...menuItem, ...logoutItem];

  if (!user) {
    return (
      <Link to="/login">
        <Button type="primary">Accedi/Registrati</Button>
      </Link>
    );
  }
  return (
    <>
      <Dropdown
        menu={{ items: menuItems, onClick: handleDrop }}
        placement="bottomRight"
        className="dropdown"
      >
        <div className="menu-user-logged">
          {isAdmin ? <span>ADMIN</span> : <p>Ciao {user.user.firstName} !</p>}
        </div>
      </Dropdown>
    </>
  );
};

export default UserMenu;
