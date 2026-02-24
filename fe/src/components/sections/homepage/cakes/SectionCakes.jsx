import { Row, Spin } from "antd";
import { useEffect, useState } from "react";
import LoadingSpinner from '../../../costum/LoadingSpinner'
import CardCake from "./cardCake/CardCake";
import { Link } from "react-router-dom";
import "./cakes.css";
const SectionCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCakes = async () => {
    setLoading(true); 
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/cakes`);
      
      if (!res.ok) {
        throw new Error("Errore nel caricamento delle torte");
      }
      const data = await res.json();
  
      setCakes(data.cakes);
    } catch (error) {
      console.error("ERRORE", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCakes();
  }, []);

  return (
    <div className="container-section-cake">
      <Row className="h2-link">
        <h2>Le nostre ultime creazioni</h2>
        <Link to="/cakes">Fatti ispirare per il tuo prossimo ordine...</Link>
      </Row>
      <LoadingSpinner loading={loading}>
        <Row gutter={[30, 16]} justify='center'>
          {cakes.slice(0, 4).map((cake) => (
            <CardCake
              key={cake._id}
              img={cake.image}
              title={cake.name}
              description={cake.description}
              price={cake.price}
            />
          ))}
        </Row>
      </LoadingSpinner>
    </div>
  );
};

export default SectionCakes;