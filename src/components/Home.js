import React, { useState } from "react";
import '../css/Home.css';
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import Presentation from "./Presentation";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import { ProductsContextProvider } from "../global/ProductContext";
import ChatButton from "./ChatButton";


export const Home = ({user}) => {
  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Presentation />
      <Products />
      <ProductsContextProvider>
        <ChatButton />
      </ProductsContextProvider>
      
      <Footer />
    </div>
  );
};
