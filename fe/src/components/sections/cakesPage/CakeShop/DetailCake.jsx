import { useState, useEffect } from "react";
import { Empty } from "antd";
import LoadingSpinner from "../../../costum/LoadingSpinner";
import "./detailCake.css";
const DetailCake = ({ cakeId, onClose }) => {
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const getCake = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/detail?id=${cakeId}`,
      );
      if (!res.ok) {
        throw new Error("Errore nel caricamento delle torte");
      }
      const data = await res.json();
      console.log("TORTA SELEZIONATA", data);
      setCake(data.cake);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (cakeId) {
      getCake();
    }
  }, [cakeId]);

  if (loading) {
    return (
      <div className="detail-cake-loading">
        <LoadingSpinner loading={loading} />
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="detail-cake-error">
        <Empty description="Torta non trovata" />
      </div>
    );
  }
  return (
    <div className="modal-detail">
      <h2>{cake.name}</h2>
      <img src={cake.image} alt={cake.name} />
      <h3>Descrizione</h3>
      <p> {cake.description} </p>
      <h3>Ingredienti</h3>
      {cake.ingredients && cake.ingredients.length > 0 && (
        <div>
          <ul>
            {cake.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
      <h3>Porzioni</h3>
      <p>{cake.cakeServings} persone</p>
    </div>
  );
};

export default DetailCake;
