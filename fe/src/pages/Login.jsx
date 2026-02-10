import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

const Login = () => {
  return (
    <>
      <Row>
        <Col>
          <h2>Accedi a PastryLab</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Inserisci la email" },
                { type: "email", message: "Email non valida" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Inserisci la password" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
