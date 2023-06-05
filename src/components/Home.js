import React, { useState } from "react";
import '../css/Home.css';
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import Presentation from "./Presentation";
import Footer from "./Footer";
import ChatBot from "./ChatBot";


export const Home = ({user}) => {
  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Presentation />
      <Products />
      {/* <ChatBot /> */}
      <Footer />
      
    </div>
  );
};
