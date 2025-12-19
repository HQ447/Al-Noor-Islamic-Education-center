import React, { useEffect } from "react";
import Hero from "./Hero";
import ChooseUs from "./ChooseUs";
import Testimonial from "./Testimonial";
import Faqs from "./Faqs";
import { useLocation } from "react-router";
import { FaWhatsapp } from "react-icons/fa6";


function Home() {
  const phoneNumber = "923367191936";
  const message = "Assalam O Alikum! I’m interested in your services.";
  const encodedMessage = encodeURIComponent(message);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className="">
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 flex items-center justify-center transition-all bg-green-500 rounded-full hover:scale-105 right-10 bottom-7 md:bottom-10 w-13 h-13"
      >
        <FaWhatsapp className="text-2xl text-white" />
   
      </a>
      <Hero />
      <ChooseUs />
      <Testimonial />
      <Faqs />
    </div>
  );
}

export default Home;
