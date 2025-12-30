import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hero from "./Home/Hero";
import ChooseUs from "./Home/ChooseUs";
import Testimonial from "./Home/Testimonial";
import Faqs from "./Home/Faqs";
import { Outlet } from "react-router";


function Main() {
  return (
    <div>
      <Navbar />

      <Outlet />
    

      <Footer />
    </div>
  );
}

export default Main;
