import React, { useContext } from "react";
import { ProductsContext } from "../global/ProductContext";
import { CartContext } from "../global/CartContext";


export const Products = () => {
  const { products } = useContext(ProductsContext);
  const cartContext = useContext(CartContext);
  return (
    <div className="products">
      {products.length !== 0 && <h1>Товари</h1>}
      <div className="products-wrapper">
      <div className="products-container">
        {products.map((product) => (
          <div className="product-card">
            <div className="product-img">
              <img src={product.productImg} alt="not found" />
            </div>
            <div className="product-name">
              <h3>{product.productName}</h3>
            </div>
            <div className="product-desc">
              <p>{product.productDescription}</p>
            </div>
            <div className="product-price">
              <b>{product.productPrice} ₴</b>
            </div>
            <div className="add-to-cart" onClick={() => cartContext.dispatch({type: 'add', payload: product})}>+</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

