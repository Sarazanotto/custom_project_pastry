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
  Spin,
  Modal,
  message,
} from "antd";
import { SaveOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context/AuthContext";
import useUser from "../../../hook/useUser";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const ProfileUser = () => {
  const { user, login, logout } = useContext(AuthContext);
  const { updateUser, deletUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user) {
      
      const addressesForForm = user.user.address?.map(addr => {
        
        if (typeof addr === 'object' && addr._id) {
          return {
            street: addr.street,
            city: addr.city,
            zipCode: addr.zipCode,
            country: addr.country || 'Italy'
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
        message.success("Profilo aggiornato con successo!");
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
          <Card
            className="profile-card"
            title={
              <div className="title-card-profile">
                <h4>
                  <strong>Il mio profilo</strong>
                </h4>

                <Button type="primary" danger onClick={handleDeleteProfile}>
                  <small>Elimina Account</small>
                </Button>
              </div>
            }
          >
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

              <Divider orientation="left">Indirizzi</Divider>

              <Form.List name="addresses">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Card
                        key={field.key}
                        size="small"
                        title={`Indirizzo ${index + 1}`}
                        style={{ marginBottom: 16 }}
                        extra={
                          <Button
                            type="text"
                            danger
                            onClick={() => remove(field.name)}
                          >
                            Rimuovi
                          </Button>
                        }
                      >
                        <Row gutter={16}>
                          <Col xs={24}>
                            <Form.Item
                              name={[field.name, "street"]}
                              label="Via"
                              rules={[
                                {
                                  required: true,
                                  message: "Inserisci la via",
                                },
                              ]}
                            >
                              <Input placeholder="Es: Via Roma 123" />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12}>
                            <Form.Item
                              name={[field.name, "city"]}
                              label="Città"
                              rules={[
                                {
                                  required: true,
                                  message: "Inserisci la città",
                                },
                              ]}
                            >
                              <Input placeholder="Es: Milano" />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12}>
                            <Form.Item
                              name={[field.name, "zipCode"]}
                              label="CAP"
                              rules={[
                                {
                                  required: true,
                                  message: "Inserisci il CAP",
                                },
                              ]}
                            >
                              <Input placeholder="Es: 20100" />
                            </Form.Item>
                          </Col>

                          <Col xs={24}>
                            <Form.Item
                              name={[field.name, "country"]}
                              label="Paese"
                              initialValue="Italy"
                            >
                              <Input placeholder="Es: Italy" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Aggiungi Indirizzo
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                >
                  Salva Profilo
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <div className="date-create-account">
              <p>
                <small>Account creato il:</small>{" "}
                {new Date(user.user.createdAt).toLocaleDateString("it-IT")}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileUser;