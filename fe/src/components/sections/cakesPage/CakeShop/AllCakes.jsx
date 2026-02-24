import { Row } from "antd";
import { useEffect, useState } from "react";
import "./cakes.css";
import CardCakes from "./CardCakes";
import LoadingSpinner from "../../../costum/LoadingSpinner";

const AllCakes = () => {
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

  const groupByCategory = cakes.reduce((acc, cake) => {
    if (!acc[cake.category]) {
      acc[cake.category] = [];
    }
    acc[cake.category].push(cake);
    return acc;
  }, {});

  return (
    <div className="container-shop-cake">
      <LoadingSpinner loading={loading}>
        {Object.keys(groupByCategory).map((category) => (
          <div key={category}>
            <Row justify="center">
              <h2>{category}</h2>
            </Row>
            <Row gutter={[30, 16]} justify="center">
              {groupByCategory[category].map((cake) => (
                <CardCakes
                  key={cake._id}
                  id={cake._id}
                  img={cake.image}
                  title={cake.name}
                  description={cake.description}
                  price={cake.price}
                />
              ))}
            </Row>
          </div>
        ))}
      </LoadingSpinner>
    </div>
  );
};

export default AllCakes;
