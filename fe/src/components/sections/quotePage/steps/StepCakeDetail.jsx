import { Form, Select, Input } from "antd";

const StepCakeDetails = () => {
  return (
    <>
      <Form.Item
        name="form"
        label="Forma della Torta"
        rules={[{ required: true, message: "Seleziona la forma" }]}
      >
        <Select placeholder="Seleziona la forma">
          <Select.Option value="rotonda">Rotonda</Select.Option>
          <Select.Option value="quadrata">Quadrata</Select.Option>
          <Select.Option value="rettangolare">Rettangolare</Select.Option>
          <Select.Option value="cuore">A Cuore</Select.Option>
          <Select.Option value="personalizzata">Personalizzata</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="cakeBase"
        label="Impasto base"
        rules={[{ required: true, message: "Seleziona la base" }]}
      >
        <Select placeholder="Seleziona la base">
          <Select.Option value="pan di spagna">Pan di Spagna</Select.Option>
          <Select.Option value="cake al cioccolato">Cake al cioccolato</Select.Option>
          <Select.Option value="cake alle carote">Cake alle carote</Select.Option>
          <Select.Option value="frolla croccante">Frolla croccante</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="cakeSoak"
        label="Bagna (nessuna se base frolla)"
        rules={[{ required: true, message: "Seleziona la bagna" }]}
      >
        <Select placeholder="Seleziona la bagna">
          <Select.Option value="alchermes">Alchermes</Select.Option>
          <Select.Option value="limoncello">Limoncello</Select.Option>
          <Select.Option value="caffè">Caffè</Select.Option>
          <Select.Option value="semplice vaniglia">Semplice alla vaniglia</Select.Option>
          <Select.Option value="nessuna">Nessuna</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="cakeCream"
        label="Crema"
        rules={[{ required: true, message: "Seleziona la crema" }]}
      >
        <Select placeholder="Seleziona la crema">
          <Select.Option value="chantilly">Chantilly</Select.Option>
          <Select.Option value="mascarpone">Mascarpone</Select.Option>
          <Select.Option value="crema pasticcera">
            Crema Pasticcera
          </Select.Option>
          <Select.Option value="cioccolato">Cioccolato</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="cakeTopping"
        label="Topping"
        rules={[{ required: true, message: "Seleziona il topping" }]}
      >
        <Select placeholder="Seleziona il topping">
          <Select.Option value="frutta fresca">Frutta Fresca</Select.Option>
          <Select.Option value="cioccolato">Cioccolato</Select.Option>
          <Select.Option value="caramello">Caramello</Select.Option>
          <Select.Option value="glassa">Glassa a specchio</Select.Option>
          <Select.Option value="panna">Panna</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="cakeLettering" label="Scritta (opzionale)">
        <Input placeholder="Es: Buon Compleanno Maria" />
      </Form.Item>
    </>
  );
};

export default StepCakeDetails;
