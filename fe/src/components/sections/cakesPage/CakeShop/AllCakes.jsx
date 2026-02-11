import { Row, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "./cakes.css";
import CardCakes from "./CardCakes";
import useLoading from "../../../../hook/useLoading";

const AllCakes = () => {
  const [cakes, setCakes] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();

  const getCakes = async () => {
    startLoading();
    try {
      const res = await fetch(`http://localhost:4545/cakes`);
      
      if (!res.ok) {
        throw new Error("Errore nel caricamento delle torte");
      }
      const data = await res.json();
    
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

const groupByCategory=cakes.reduce((acc,cake)=>{
  if(!acc[cake.category]){
    acc[cake.category]=[]
  }
  acc[cake.category].push(cake)
  return acc
},{})


  return (
    <div className="container-shop-cake">
   
      <Spin spinning={loading} description="In caricamento">

        {Object.keys(groupByCategory).map(category=>(
          <div key={category}>
          <Row justify='center'><h2>{category}</h2></Row>
          <Row gutter={[30, 16]} justify='center'>
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



     
      </Spin>
    </div>
  );
};

export default AllCakes;
