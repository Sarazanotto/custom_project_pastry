import { Modal, Form, Input, InputNumber, Select, Upload, Button } from "antd";

import { useState, useEffect } from "react";

const { TextArea } = Input;
const { Option } = Select;

const CakeModal = ({ visible, onCancel, onSubmit, cake }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (visible) {
      if (cake) {
        form.setFieldsValue({
          name: cake.name,
          description: cake.description,
          price: cake.price,
          category: cake.category,
          ingredients: cake.ingredients?.join(", ") || "",
          cakeServings: cake.cakeServings,
          image: cake.image,
        });
        setImageUrl(cake.image || "");
      } else {
        form.resetFields();
        setImageUrl("");
      }
    }
  }, [cake, form, visible]);

  const handleUpload = async (file) => {
    console.log("Starting upload for file:", file.name);
    setUploading(true);
    const formData = new FormData();
    formData.append("cakeImage", file);

    try {
      const token = localStorage.getItem("token");
      const uploadUrl = `${import.meta.env.VITE_SERVER_URL}/cakes/img`;

      console.log("Upload URL:", uploadUrl);
      console.log("Has token:", !!token);

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);

        let errorMessage = `Errore ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Upload response:", data);

      if (data.img) {
        console.log("Setto imageUrl:", data.img);
        setImageUrl(data.img);
        form.setFieldsValue({ image: data.img });
        alert("Immagine caricata con successo!");
      } else {
        throw new Error("Nessuna immagine ricevuta dal server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Errore upload: ${error.message}`);
      setImageUrl("");
    } finally {
      setUploading(false);
    }

    return false;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.image = imageUrl;
      if (typeof values.ingredients === "string") {
        values.ingredients = values.ingredients
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);
      }
      onSubmit(values);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const categories = [
    "Compleanno",
    "Matrimonio",
    "Battesimo",
    "Comunione",
    "Laurea",
    "Occasioni Speciali",
    "Classica",
  ];

  return (
    <Modal
      title={cake ? "Modifica Torta" : "Aggiungi Nuova Torta"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Annulla
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {cake ? "Salva Modifiche" : "Crea Torta"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ingredients: [""],
          cakeServings: 1,
        }}
      >
        <Form.Item
          name="name"
          label="Nome Torta"
          rules={[{ required: true, message: "Inserisci il nome della torta" }]}
        >
          <Input placeholder="Es: Torta Sacher" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrizione"
          rules={[{ required: true, message: "Inserisci una descrizione" }]}
        >
          <TextArea rows={4} placeholder="Descrivi la torta..." />
        </Form.Item>

        <Form.Item
          name="category"
          label="Categoria"
          rules={[{ required: true, message: "Seleziona una categoria" }]}
        >
          <Select placeholder="Seleziona categoria" size="large">
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
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
          name="cakeServings"
          label="Numero Porzioni"
          rules={[
            { required: true, message: "Inserisci il numero di porzioni" },
            {
              type: "number",
              min: 1,
              message: "Il numero di porzioni deve essere almeno 2",
            },
          ]}
        >
          <InputNumber min={2} size="large" />
        </Form.Item>

        <Form.Item name="ingredients" label="Ingredienti">
          <Input size="large" />
        </Form.Item>

        <Form.Item label="Immagine">
          <Upload beforeUpload={handleUpload} maxCount={1} accept="image/*">
            <Button loading={uploading} type="primary">
              Carica Immagine
            </Button>
          </Upload>
        </Form.Item>

        {imageUrl && (
          <div className="img-modal-admin-cake">
            <img src={imageUrl} alt="cake" />
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default CakeModal;
