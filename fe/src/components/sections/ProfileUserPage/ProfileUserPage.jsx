import { useState, useEffect, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Input,
  DatePicker,
  Divider,
  Modal,
  message,
} from "antd";
import { AuthContext } from "../../../context/AuthContext";
import useUser from "../../../hook/useUser";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import AddressForm from "./AddressForm";

const ProfileUserPage = () => {
  const { user, login, logout } = useContext(AuthContext);
  const { updateUser, deletUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user) {
      const addressesForForm =
        user.user.address?.map((addr) => {
          if (typeof addr === "object" && addr._id) {
            return {
              street: addr.street,
              city: addr.city,
              zipCode: addr.zipCode,
              country: addr.country || "Italy",
            };
          }
          return addr;
        }) || [];

      form.setFieldsValue({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email,
        phone: user.user.phone,
        birthDate: user.user.birthDate ? dayjs(user.user.birthDate) : null,
        addresses: addressesForForm,
      });
    }
  }, [user, form]);

  const handleUpdateProfile = async (values) => {
    setLoading(true);

    try {
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate ? values.birthDate.toISOString() : null,
        address: values.addresses || [],
      };

      const data = await updateUser(user.user._id, updateData);

      if (data && data.user) {
        const token = localStorage.getItem("token");
        login({ user: data.user }, token);
        message.success("Profilo aggiornato");
      }
    } catch (error) {
      console.error("Errore aggiornamento:", error);
      message.error("Errore nell'aggiornamento del profilo");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = () => {
    Modal.confirm({
      title: "Sei sicuro?",
      content: "Questa azione è irreversibile!",
      okText: "Sì, elimina",
      cancelText: "Annulla",
      okType: "danger",
      onOk: async () => {
        try {
          await deletUser(user.user._id);
          localStorage.removeItem("token");
          if (logout) logout();
          message.success("Account eliminato");
          navigate("/");
        } catch (error) {
          console.error("Errore eliminazione:", error);
          message.error("Errore nell'eliminazione dell'account");
        }
      },
    });
  };

  return (
    <div className="profile-container">
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={14} xl={12}>
          <div className="title-card-profile">
            <div>
              <h2>Il tuo profilo</h2>
              <small>
                *aggiungi il tuo compleanno per ricevere uno sconto il tuo
                giorno speciale!
              </small>
              <br />
              <small>
                **aggiungi l'indirizzo se vuoi richiedere un preventivo
              </small>
            </div>

            <Button onClick={handleDeleteProfile}>
              <small>Elimina Account</small>
            </Button>
          </div>

          <Card className="card-profile">
            <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Nome"
                    name="firstName"
                    rules={[{ required: true, message: "Inserisci il nome" }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Cognome"
                    name="lastName"
                    rules={[
                      { required: true, message: "Inserisci il cognome" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Inserisci l'email" },
                  { type: "email", message: "Email non valida" },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Telefono"
                name="phone"
                rules={[{ required: true, message: "Inserisci il telefono" }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item label="Data di Nascita" name="birthDate">
                <DatePicker
                  className="calendar"
                  size="large"
                  format="DD/MM/YYYY"
                  placeholder="Seleziona data"
                />
              </Form.Item>

              <Divider>Indirizzi</Divider>

              <AddressForm/>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={loading}
                >
                  Salva Profilo
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileUserPage;
