import { Space } from "antd";
import React from "react";
import Hero from "../components/sections/homepage/hero/Hero";
import SectionCakes from "../components/sections/homepage/cakes/SectionCakes";
import AboutUs from "../components/sections/homepage/about/AboutUs";

const Homepage = () => {
  return (
   <>
      <Hero />
      <SectionCakes />
      <AboutUs/>
     
    </>
  );
};

export default Homepage;
