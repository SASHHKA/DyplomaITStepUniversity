import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import {auth} from '../config/Config';
import CardModal from "./CardModal";
import { useState } from "react";


export const Navbar = ({user}) => {
  const [cardModalActive, setCardModalActive] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    auth.signOut().then(
      navigate('/')
    )
  }

  return (
    <div className="navbox-container">
      <div className="navbox">
        <div className="leftside">
          <h2>Eshop</h2>
        </div>
        {!user && 
          <div className="rightside-non-user">
            <Link to='signup' className="navlinks">Реєстрація</Link>
            <Link to='signin' className="navlinks">Увійти</Link>
          </div>}
          {user && 
          <div className="rightside-user">
            <div className="shop-cart">
              <button  className="shop-cart-btn" onClick={() => setCardModalActive(true)}><FaShoppingBasket /></button>
            </div>
            <div className="username">
              <span>{user}</span>
            </div>
            <div className="logout">
              <button className="logout-btn" onClick={logout}><SlLogout /></button>
            </div>
            
          </div>}
      </div>
      <CardModal active={cardModalActive} setActive={setCardModalActive}/>
    </div>
  );
};
