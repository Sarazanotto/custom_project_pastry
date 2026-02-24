import { Modal, Form, InputNumber, Input, Button } from 'antd';
import { EuroOutlined, MailOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const QuoteModal = ({ visible, onCancel, onSubmit, quote }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        priceQuoted: values.priceQuoted,
        adminNotes: values.adminNotes || '',
        status: 'quoted',
      });
      form.resetFields();
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <EuroOutlined />
          <span>Inserisci Preventivo</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
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
      width={600}
    >
      <div style={{ marginBottom: 20, padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
        <p><strong>Cliente:</strong> {quote?.user?.firstName} {quote?.user?.lastName}</p>
        <p><strong>Email:</strong> {quote?.user?.email}</p>
        <p><strong>Evento:</strong> {quote?.event}</p>
        <p><strong>Persone:</strong> {quote?.serving}</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          priceQuoted: quote?.priceQuoted || undefined,
          adminNotes: quote?.adminNotes || '',
        }}
      >
        <Form.Item
          name="priceQuoted"
          label="Prezzo (€)"
          rules={[
            { required: true, message: 'Inserisci il prezzo' },
            { type: 'number', min: 1, message: 'Il prezzo deve essere maggiore di 0' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            precision={2}
            placeholder="Es: 45.00"
            prefix="€"
            size="large"
          />
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

      <div style={{ 
        marginTop: 20, 
        padding: '12px', 
        background: '#e6f7ff', 
        border: '1px solid #91d5ff',
        borderRadius: '4px' 
      }}>
        <p style={{ margin: 0, fontSize: '13px' }}>
          ℹ️ Cliccando su "Invia Email" il cliente riceverà un'email con il preventivo e potrà confermare o rifiutare l'ordine.
        </p>
      </div>
    </Modal>
  );
};

export default QuoteModal;