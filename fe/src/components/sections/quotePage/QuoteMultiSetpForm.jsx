import { useState } from "react";
import { Steps, Button, Form, message } from "antd"; 
import { useNavigate } from "react-router-dom";
import useQuote from "../../../hook/useQuote";
import  useAddress  from "../../../hook/useAddress";
import StepEvent from "./steps/StepsEvent";
import StepCakeDetails from "./steps/StepCakeDetail";
import StepAddress from "./steps/StepAddress";
import StepNotes from "./steps/StepNotes";
import StepSummary from "./steps/StepSummary";
import "./quote.css"

const QuoteMultiStepForm = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { createQuote, loading } = useQuote();
  const { createAddress } = useAddress();

  const steps = [
    { title: "Evento", content: <StepEvent /> },
    { title: "Torta", content: <StepCakeDetails /> },
    { title: "Indirizzo", content: <StepAddress /> },
    { title: "Note", content: <StepNotes /> },
    { title: "Riepilogo", content: <StepSummary data={formData} /> }
  ];

  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormData({ ...formData, ...values });
      setCurrent(current + 1);
    } catch (error) {
      message.error("Compila tutti i campi obbligatori");
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      let addressId = formData.address;

    
      if (formData.newAddress) {
        const newAddr = await createAddress(formData.newAddress);
        addressId = newAddr.newAddress._id;
      }

      const deliveryDate = formData.deliveryData 
        ? formData.deliveryData.toISOString() 
        : new Date().toISOString();

      console.log("Dati preventivo da inviare:", {
        event: formData.event,
        serving: formData.serving,
        deliveryData: deliveryDate,
        form: formData.form,
        cakeBase: formData.cakeBase,
        cakeSoak: formData.cakeSoak,
        cakeCream: formData.cakeCream,
        cakeTopping: formData.cakeTopping,
        cakeLettering: formData.cakeLettering || "",
        cakeDecoration: formData.cakeDecoration || "",
        allergies: formData.allergies || "",
        otherNotes: formData.otherNotes || "",
        exapleCake: formData.exapleCake || "",
        address: addressId
      });

     
      const result = await createQuote({
        event: formData.event,
        serving: formData.serving,
        deliveryData: deliveryDate,
        form: formData.form,
        cakeBase: formData.cakeBase,
        cakeSoak: formData.cakeSoak,
        cakeCream: formData.cakeCream,
        cakeTopping: formData.cakeTopping,
        cakeLettering: formData.cakeLettering || "",
        cakeDecoration: formData.cakeDecoration || "",
        allergies: formData.allergies || "",
        otherNotes: formData.otherNotes || "",
        exapleCake: formData.exapleCake || "",
        address: addressId
      });
      
      message.success("La richiesta del preventivo è andata a buon fine");
      
      setTimeout(() => {
        navigate("/orders");
      }, 500);
      
    } catch (error) {
      console.error("Errore completo:", error);
      message.error("Errore nella creazione del preventivo");
    }
  };

  return (
    <div className="container-multistep">
      <h1>Richiedi un Preventivo</h1>
      
      <Steps current={current} className="steps-form">
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form form={form} layout="vertical" initialValues={formData}>
        <div className="content-form">
          {steps[current].content}
        </div>

        <div className="actions-form">
          {current > 0 && (
            <Button onClick={prev}>Indietro</Button>
          )}
          
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>Avanti</Button>
          )}
          
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Invia Richiesta
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default QuoteMultiStepForm;