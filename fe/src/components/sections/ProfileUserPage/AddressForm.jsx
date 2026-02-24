import { Card, Row, Col, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddressForm = () => {
  return (
    <Form.List name="addresses">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Indirizzo ${index + 1}`}
              extra={
                <Button type="text" danger onClick={() => remove(field.name)}>
                  Rimuovi
                </Button>
              }
            >
              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item
                    name={[field.name, "street"]}
                    label="Via"
                    rules={[{ required: true, message: "Inserisci la via" }]}
                  >
                    <Input placeholder="Es: Via Roma 123" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={[field.name, "city"]}
                    label="Città"
                    rules={[{ required: true, message: "Inserisci la città" }]}
                  >
                    <Input placeholder="Es: Milano" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={[field.name, "zipCode"]}
                    label="CAP"
                    rules={[{ required: true, message: "Inserisci il CAP" }]}
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
            <Button type="text" onClick={() => add()} icon={<PlusOutlined />}>
              Aggiungi Indirizzo
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default AddressForm;