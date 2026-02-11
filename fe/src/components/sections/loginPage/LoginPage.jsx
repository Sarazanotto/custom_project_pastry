import { Button, Col, Divider, Form, Input, Row } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useLogin from "../../../hook/useLogin";
import ModalRegistration from "./modalRegistration";
import "./loginpage.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { login } = useContext(AuthContext);
  const { loginAndGetToken } = useLogin();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await loginAndGetToken(values);
      if (result) {
        login(result.user, result.token);

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      form.setFields([
        { name: "email",
         
           errors: ["Email o password non sono corretti"] },
        { name: "password", 
         
          errors: ["Email o password non sono corretti"] },
    
      ]);
      console.log("Form prop esiste?", form ? "SÌ" : "NO")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login-form">
      <Row justify="center" align="middle" className="form-page">
        <Col xs={22} sm={20} md={16} lg={10}>
          <div className="card-login">
            <Row justify="center">
              <Col span={24}>
                <h2>Accedi al nostro negozio</h2>
              </Col>
            </Row>

            <Row justify="center" align="middle">
              <Col span={24}>
                <Form
                form={form}
                  name="login"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Inserisci la tua email" },
                      { type: "email", message: "Email non valida" },
                    ]}
                  >
                    <Input
                      placeholder="esempio@email.com"
                      size="large"
                      disabled={loading}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Inserisci la password" },
                    ]}
                  >
                    <Input.Password size="large" disabled={loading} />
                  </Form.Item>

                  <Form.Item label={null}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      loading={loading}
                    >
                      {loading ? "Accesso in corso..." : "Accedi"}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            <Divider>Oppure</Divider>

            <Row justify="center" gutter={16} className="social-icon">
              <Col>
                <Button icon={<GoogleOutlined />} size="large" type="primary">
                  Google
                </Button>
              </Col>
              <Col>
                <Button icon={<FacebookOutlined />} size="large" type="primary">
                  Facebook
                </Button>
              </Col>
            </Row>

            <Row justify="center" align="middle" style={{ marginTop: 16 }}>
              <Col>
                <p>
                  Non hai un account?
                  <Button type="link" onClick={openModal}>
                    Registrati
                  </Button>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <ModalRegistration visible={open} onClose={closeModal} />
    </div>
  );
};

export default LoginPage;
