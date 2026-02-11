import React from "react";
import { Modal } from "antd";
import FormRegistration from "./FormRegistration";
import useUser from "../../../hook/useUser";

const ModalRegistration = ({ visible, onClose }) => {
  const { createUser } = useUser();
  const handleRegister = async (values) => {
    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
      };

      const data = await createUser(userData);
      console.log("utente creato", data);
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Modal
      title="Registrazione"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <FormRegistration onFinish={handleRegister} />
    </Modal>
  );
};

export default ModalRegistration;
