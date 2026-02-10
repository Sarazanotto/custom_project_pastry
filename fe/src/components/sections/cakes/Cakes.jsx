import { Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./cakes.css";
import CardCake from "./cardCake/CardCake";
import useLoading from "../../../hook/useLoading";

const Cakes = () => {
  const [cakes, setCakes] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();

  const getCakes = async () => {
    startLoading();
    try {
      const res = await fetch(`http://localhost:4545/cakes`);
      console.log("Status:", res.status); // Debug
      if (!res.ok) {
        throw new Error("Errore nel caricamento delle torte");
      }
      const data = await res.json();
      console.log("DATA:", data, typeof data, Array.isArray(data));
      setCakes(data.cakes);
    } catch (error) {
      console.error("ERRORE", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getCakes();
  }, []);

  return (
    <div className="container-section-cake">
      <Row justify="center" >
        <h2>Le nostre ultime creazioni</h2>
      </Row>
      <Spin spinning={loading} tip="In caricamento">
        <Row gutter={[30, 16]} justify='center'>
          {cakes.slice(0,4).map((cake) => (
            <CardCake
              key={cake._id}
              img={cake.image}
              title={cake.name}
              description={cake.description}
              price={`€${cake.price}`}
            />
          ))}
        </Row>
      </Spin>
    </div>
  );
};

export default Cakes;
