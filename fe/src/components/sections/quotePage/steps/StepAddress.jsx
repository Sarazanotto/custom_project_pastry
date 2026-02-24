import { Form, Input, Select, Button, Space, Radio } from "antd";
import { useState, useEffect } from "react";
import useAddress from "../../../../hook/useAddress";
import { PlusOutlined, ShopOutlined } from "@ant-design/icons";

const StepAddress = () => {
  const { addresses, fetchAddresses, loading } = useAddress();
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState("delivery");

const handleDelivery = (e) => setDeliveryMode(e.target.value);
const handleNewAddress = () => setShowNewAddress(true);
const handleSavedAddress = () => setShowNewAddress(false);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);


  return (
    <>
      <Form.Item
        name="deliveryMode"
        label="Modalità di Consegna"
        initialValue="delivery"
        rules={[{ required: true, message: "Seleziona una modalità" }]}
      >
        <Radio.Group onChange={handleDelivery}>
          <Radio.Button value="delivery">Consegna a domicilio</Radio.Button>
          <Radio.Button value="shop">
            <ShopOutlined /> Ritiro in negozio
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      {deliveryMode === "shop" && (
        <div>
          <p>
            <strong>Indirizzo negozio:</strong>
            <br />
            Via Roma, 10 - 35100 Padova (PD)
            <br />
            <small>Orari: Lun-Sab 9:00-19:00</small>
          </p>
        </div>
      )}

      {deliveryMode === "delivery" && (
        <>
          {addresses.length > 0 && !showNewAddress ? (
            <>
              <Form.Item
                name="address"
                label="Seleziona Indirizzo"
                rules={[{ required: true, message: "Seleziona un indirizzo" }]}
              >
                <Select
                  placeholder="Seleziona un indirizzo salvato"
                  loading={loading}
                >
                  {addresses.map((address) => (
                    <Select.Option key={address._id} value={address._id}>
                      {address.street}, {address.city} - {address.zipCode}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={handleNewAddress}
              >
                Aggiungi nuovo indirizzo
              </Button>
            </>
          ) : (
            <>
              {addresses.length > 0 && (
                <Space>
                  <Button onClick={handleSavedAddress}>
                    Usa indirizzo salvato
                  </Button>
                </Space>
              )}

              <Form.Item
                name={["newAddress", "street"]}
                label="Via"
                rules={[{ required: true, message: "Inserisci la via" }]}
              >
                <Input placeholder="Via Roma, 10" />
              </Form.Item>

              <Form.Item
                name={["newAddress", "city"]}
                label="Città"
                rules={[{ required: true, message: "Inserisci la città" }]}
              >
                <Input placeholder="Padova" />
              </Form.Item>

              <Form.Item
                name={["newAddress", "zipCode"]}
                label="CAP"
                rules={[{ required: true, message: "Inserisci il CAP" }]}
              >
                <Input placeholder="35100" />
              </Form.Item>

              <Form.Item
                name={["newAddress", "country"]}
                label="Paese"
                initialValue="Italy"
              >
                <Input disabled />
              </Form.Item>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StepAddress;
