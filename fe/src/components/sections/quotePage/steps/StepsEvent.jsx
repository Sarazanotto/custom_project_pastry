import { Form, Input, DatePicker, Select } from "antd";

const StepEvent = () => {
  return (
    <>
      <Form.Item
        name="event"
        label="Tipo di Evento"
        rules={[{ required: true, message: "Seleziona il tipo di evento" }]}
      >
        <Select placeholder="Seleziona l'evento">
          <Select.Option value="compleanno">Compleanno</Select.Option>
          <Select.Option value="matrimonio">Matrimonio</Select.Option>
          <Select.Option value="battesimo">Battesimo</Select.Option>
          <Select.Option value="comunione">Comunione</Select.Option>
          <Select.Option value="cresima">Cresima</Select.Option>
          <Select.Option value="laurea">Laurea</Select.Option>
          <Select.Option value="altro">Altro</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="serving"
        label="Numero di Persone"
        rules={[{ required: true, message: "Inserisci il numero di persone" }]}
      >
        <Input type="number" min={2} placeholder="Es: 20" />
      </Form.Item>

      <Form.Item
        name="deliveryData"
        label="Data di Consegna (almeno 5 giorni)"
        rules={[{ required: true, message: "Seleziona la data di consegna" }]}
      >
        <DatePicker 
          format="DD/MM/YYYY"
          placeholder="Seleziona la data"
        />
      </Form.Item>
    </>
  );
};

export default StepEvent;