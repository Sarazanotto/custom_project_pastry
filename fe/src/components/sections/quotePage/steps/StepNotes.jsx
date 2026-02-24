import { Form, Input } from "antd";

const { TextArea } = Input;

const StepNotes = () => {
  return (
    <>
      <Form.Item
        name="cakeDecoration"
        label="Decorazioni Speciali (opzionale)"
      >
        <TextArea 
          rows={3} 
          placeholder="Es: Fiori in pasta di zucchero, personaggi Disney..."
        />
      </Form.Item>

      <Form.Item
        name="allergies"
        label="Allergie o Intolleranze (opzionale)"
      >
        <TextArea 
          rows={2} 
          placeholder="Es: Intolleranza al lattosio, allergia alle noci..."
        />
      </Form.Item>

      <Form.Item
        name="otherNotes"
        label="Altre Note (opzionale)"
      >
        <TextArea 
          rows={3} 
          placeholder="Eventuali richieste particolari..."
        />
      </Form.Item>

      <Form.Item
        name="exapleCake"
        label="Link Foto di Esempio (opzionale)"
      >
        <Input 
          placeholder="Incolla qui il link di un'immagine di esempio"
        />
      </Form.Item>
    </>
  );
};

export default StepNotes;