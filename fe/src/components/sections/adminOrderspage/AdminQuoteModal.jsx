import { Modal, Form, InputNumber, Input, Button } from "antd";
import {  MailOutlined } from "@ant-design/icons";
import "./admin.css";
import dayjs from "dayjs";
const { TextArea } = Input;

const QuoteModal = ({ visible, onCancel, onSubmit, quote }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        priceQuoted: values.priceQuoted,
        adminNotes: values.adminNotes || "",
        status: "quoted",
      });
      form.resetFields();
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <Modal
      title={
        <div className="modal-quote-admin">
          <p>Inserisci Preventivo</p>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} type="primary">
          Annulla
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<MailOutlined />}
          onClick={handleSubmit}
        >
          Invia Email al Cliente
        </Button>,
      ]}
    >
      <div className="container-data-user">
        <p>
          <strong>Cliente:</strong> {quote?.user?.firstName}
          {quote?.user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {quote?.user?.email}
        </p>
        <p>
          <strong>Evento:</strong> {quote?.event}
        </p>
        <p>
          <strong>Persone:</strong> {quote?.serving}
        </p>
        <p>
          <strong>Data:</strong> {dayjs(quote.deliveryData).format("DD/MM/YYYY")}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          priceQuoted: quote?.priceQuoted || undefined,
          adminNotes: quote?.adminNotes || "",
        }}
      >
        <Form.Item
          name="priceQuoted"
          label="Prezzo (€)"
          rules={[
            { required: true, message: "Inserisci il prezzo" },
            {
              type: "number",
              min: 1,
              message: "Il prezzo deve essere maggiore di 0",
            },
          ]}
        >
          <InputNumber min={1} precision={2} prefix="€" size="large" />
        </Form.Item>

        <Form.Item
          name="adminNotes"
          label="Note Aggiuntive (opzionale)"
          extra="Queste note saranno incluse nell'email al cliente"
        >
          <TextArea
            rows={4}
            placeholder="Es: La torta sarà pronta per il ritiro alle ore 15:00..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuoteModal;
