import { Form, Input, Select, Button, Space } from 'antd';
import { useState, useEffect } from 'react';
import useAddress  from '../../../../hook/useAddress';
import { PlusOutlined } from '@ant-design/icons';

const StepAddress = () => {
  const { addresses, fetchAddresses, loading } = useAddress();
  const [showNewAddress, setShowNewAddress] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <>
      {addresses.length > 0 && !showNewAddress ? (
        <>
          <Form.Item
            name="address"
            label="Seleziona Indirizzo"
            rules={[{ required: true, message: 'Seleziona un indirizzo' }]}
          >
            <Select 
              placeholder="Seleziona un indirizzo salvato"
              loading={loading}
            >
              {addresses.map(addr => (
                <Select.Option key={addr._id} value={addr._id}>
                  {addr.street}, {addr.city} - {addr.zipCode}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button 
            type="link" 
            icon={<PlusOutlined />}
            onClick={() => setShowNewAddress(true)}
          >
            Aggiungi nuovo indirizzo
          </Button>
        </>
      ) : (
        <>
          {addresses.length > 0 && (
            <Space style={{ marginBottom: 16 }}>
              <Button onClick={() => setShowNewAddress(false)}>
                Usa indirizzo salvato
              </Button>
            </Space>
          )}

          <Form.Item
            name={['newAddress', 'street']}
            label="Via"
            rules={[{ required: true, message: 'Inserisci la via' }]}
          >
            <Input placeholder="Via Roma, 10" />
          </Form.Item>

          <Form.Item
            name={['newAddress', 'city']}
            label="Città"
            rules={[{ required: true, message: 'Inserisci la città' }]}
          >
            <Input placeholder="Padova" />
          </Form.Item>

          <Form.Item
            name={['newAddress', 'zipCode']}
            label="CAP"
            rules={[{ required: true, message: 'Inserisci il CAP' }]}
          >
            <Input placeholder="35100" />
          </Form.Item>

          <Form.Item
            name={['newAddress', 'country']}
            label="Paese"
            initialValue="Italy"
          >
            <Input disabled />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default StepAddress;