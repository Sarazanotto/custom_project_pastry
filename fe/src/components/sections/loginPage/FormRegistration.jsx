import { Button, Form, Input } from "antd";

const FormRegistration = ({ onFinish }) => {
  return (
    <>
      <Form
        name="register"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nome"
          name="firstName"
          rules={[{ required: true, message: "Inserisci il tuo nome" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Cognome"
          name="lastName"
          rules={[{ required: true, message: "Inserisci il tuo cognome" }]}
        >
          <Input />
        </Form.Item>
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
          label="Cellulare"
          name="phone"
          rules={[
            { required: true, message: "Inserisci il tuo cellulare" },
            { pattern: /^[0-9]{10,15}$/, message: "inserisci numero valido" },
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
          <Button type="primary" htmlType="submit" block size="large">
            Registrati
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormRegistration;
